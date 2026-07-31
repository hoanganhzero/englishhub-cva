import {
  bytesToBase64,
  jsonError,
  kiraChat,
  KiraError,
  parseKiraJson,
} from "../../../lib/kira";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_FILES = 3;

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const files = form.getAll("files").filter((value): value is File => value instanceof File);
    if (!files.length) {
      return Response.json({ error: "Vui lòng tải lên ít nhất một tệp." }, { status: 400 });
    }
    if (files.length > MAX_FILES) {
      return Response.json({ error: `Chỉ hỗ trợ tối đa ${MAX_FILES} tệp mỗi lần.` }, { status: 400 });
    }

    const parts: unknown[] = [{
      text: `Bạn là giáo viên tiếng Anh THCS. Hãy tạo một bài luyện Nghe - Nói dựa trên tài liệu đính kèm.
Chỉ trả JSON hợp lệ:
{
  "title":"tiêu đề tối đa 50 ký tự",
  "description":"mô tả ngắn",
  "transcript":"hội thoại hoặc độc thoại 2-4 lượt, ghi rõ người nói",
  "keywords":["từ 1","từ 2","từ 3","từ 4"],
  "quiz":{"question":"câu hỏi hiểu bài","options":["A","B","C","D"],"correctIndex":0},
  "speakingPrompt":"một câu/chủ đề ngắn để học sinh luyện nói"
}`,
    }];

    for (const file of files) {
      if (file.size > MAX_FILE_BYTES) {
        throw new KiraError(`Tệp ${file.name} vượt quá giới hạn 8 MB.`, 413);
      }
      const bytes = new Uint8Array(await file.arrayBuffer());
      if (file.type.startsWith("text/")) {
        parts.push({ text: new TextDecoder().decode(bytes).slice(0, 12_000) });
      } else {
        parts.push({
          inlineData: {
            mimeType: file.type || "application/octet-stream",
            data: bytesToBase64(bytes),
          },
        });
      }
    }

    const content = await kiraChat([{ role: "user", parts }], 0.6);
    return Response.json(parseKiraJson(content));
  } catch (error) {
    return jsonError(error);
  }
}
