import { jsonError, kiraChat, parseKiraJson } from "../../../lib/kira";

export async function POST(request: Request) {
  try {
    const { keyword, context } = await request.json() as {
      keyword?: string;
      context?: string;
    };
    if (!keyword?.trim()) {
      return Response.json({ error: "Thiếu từ vựng cần tra." }, { status: 400 });
    }

    const content = await kiraChat([
      {
        role: "system",
        content: "Bạn là giáo viên tiếng Anh THCS tại Việt Nam. Chỉ trả JSON hợp lệ.",
      },
      {
        role: "user",
        content: `Giải thích từ "${keyword.slice(0, 100)}" trong ngữ cảnh "${(context || "English for secondary school").slice(0, 1200)}".
Trả đúng cấu trúc:
{"phonetic":"/.../","partOfSpeech":"noun/verb/etc","vietnameseMeaning":"nghĩa tiếng Việt","exampleEn":"câu ví dụ tiếng Anh đơn giản","exampleVi":"bản dịch tiếng Việt"}`,
      },
    ], 0.2);

    return Response.json(parseKiraJson(content));
  } catch (error) {
    return jsonError(error);
  }
}
