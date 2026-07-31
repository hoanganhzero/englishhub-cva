import {
  bytesToBase64,
  jsonError,
  kiraChat,
  KiraError,
  parseKiraJson,
} from "../../../lib/kira";

const MAX_AUDIO_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const audio = form.get("audio");
    const prompt = String(form.get("prompt") || "").slice(0, 1_500);
    if (!(audio instanceof File)) {
      return Response.json({ error: "Không tìm thấy bản thu âm." }, { status: 400 });
    }
    if (audio.size > MAX_AUDIO_BYTES) {
      throw new KiraError("Bản thu âm vượt quá giới hạn 10 MB.", 413);
    }

    const bytes = new Uint8Array(await audio.arrayBuffer());
    const content = await kiraChat([{
      role: "user",
      parts: [
        {
          text: `Bạn là chuyên gia phát âm tiếng Anh đánh giá học sinh Việt Nam.
Đề bài: "${prompt}"
Nghe bản thu và chỉ trả JSON hợp lệ:
{
  "score": 0,
  "criteria": {
    "fluency":"nhận xét tiếng Việt",
    "lexical":"nhận xét tiếng Việt",
    "grammar":"nhận xét tiếng Việt",
    "pronunciation":"nhận xét tiếng Việt"
  },
  "advice":"lời khuyên cải thiện bằng tiếng Việt",
  "transcribedText":"nội dung nghe được",
  "words":[{"word":"English","confidence":85}]
}
score và confidence là số từ 0 đến 100.`,
        },
        {
          inlineData: {
            mimeType: audio.type || "audio/webm",
            data: bytesToBase64(bytes),
          },
        },
      ],
    }], 0.2);

    return Response.json(parseKiraJson(content));
  } catch (error) {
    return jsonError(error);
  }
}
