import { KiraError, jsonError } from "../../../../lib/kira";

const BASE_URL = (process.env.KIRA_BASE_URL || "https://kiraai.vn").replace(/\/+$/, "");
const ALLOWED_MODELS = new Set(["kira-3.0-flash-tts", "kira-2.0-flash-tts"]);
const OPENAI_VOICE_MAP: Record<string, string> = {
  alloy: "Kore",
  echo: "Fenrir",
  fable: "Puck",
  onyx: "Charon",
  nova: "Aoede",
};
const KIRA_VOICES = new Set(["Kore", "Fenrir", "Puck", "Charon", "Aoede"]);

export async function POST(request: Request) {
  try {
    const apiKey = process.env.KIRA_API_KEY;
    if (!apiKey) {
      throw new KiraError(
        "Kira AI chưa được kích hoạt. Quản trị viên cần cấu hình KIRA_API_KEY.",
        503,
      );
    }

    const body = await request.json() as {
      input?: string;
      model?: string;
      voice?: string;
    };
    const input = body.input?.trim();
    if (!input) throw new KiraError("Thiếu nội dung cần đọc.", 400);
    if (input.length > 2_000) throw new KiraError("Nội dung đọc vượt quá 2.000 ký tự.", 400);

    const model = body.model || "kira-3.0-flash-tts";
    if (!ALLOWED_MODELS.has(model)) throw new KiraError("Model TTS không được hỗ trợ.", 400);

    const requestedVoice = body.voice || "Kore";
    const voice = OPENAI_VOICE_MAP[requestedVoice.toLowerCase()] || requestedVoice;
    if (!KIRA_VOICES.has(voice)) throw new KiraError("Giọng đọc không được hỗ trợ.", 400);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 90_000);
    try {
      const response = await fetch(`${BASE_URL}/api/v1/audio/speech`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ input, model, voice }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null) as {
          error?: { message?: string };
          message?: string;
        } | null;
        throw new KiraError(
          payload?.error?.message || payload?.message || `Kira TTS trả về mã lỗi ${response.status}.`,
          response.status,
          payload,
        );
      }

      return new Response(response.body, {
        status: 200,
        headers: {
          "Content-Type": response.headers.get("content-type") || "audio/mpeg",
          "Cache-Control": "private, max-age=3600",
        },
      });
    } catch (error) {
      if ((error as Error)?.name === "AbortError") {
        throw new KiraError("Kira TTS phản hồi quá thời gian cho phép.", 504);
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    return jsonError(error);
  }
}
