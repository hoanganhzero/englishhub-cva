const BASE_URL = (process.env.KIRA_BASE_URL || "https://kiraai.vn").replace(/\/+$/, "");
const CHAT_MODEL = process.env.KIRA_CHAT_MODEL || "kira-3.5-flash";
const TIMEOUT_MS = 90_000;

export class KiraError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status = 500, details?: unknown) {
    super(message);
    this.name = "KiraError";
    this.status = status;
    this.details = details;
  }
}

export async function kiraChat(messages: unknown[], temperature = 0.3) {
  const apiKey = process.env.KIRA_API_KEY;
  if (!apiKey) {
    throw new KiraError(
      "Kira AI chưa được kích hoạt. Quản trị viên cần cấu hình KIRA_API_KEY.",
      503,
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(`${BASE_URL}/api/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages,
        stream: false,
        temperature,
        max_tokens: 4096,
      }),
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => null) as {
      error?: { message?: string };
      choices?: Array<{ message?: { content?: string } }>;
    } | null;

    if (!response.ok) {
      throw new KiraError(
        payload?.error?.message || `Kira AI trả về mã lỗi ${response.status}.`,
        response.status,
        payload,
      );
    }

    const content = payload?.choices?.[0]?.message?.content;
    if (!content) throw new KiraError("Kira AI không trả về nội dung.");
    return content;
  } catch (error) {
    if (error instanceof KiraError) throw error;
    if ((error as Error)?.name === "AbortError") {
      throw new KiraError("Kira AI phản hồi quá thời gian cho phép.", 504);
    }
    throw new KiraError("Không thể kết nối tới Kira AI.", 502);
  } finally {
    clearTimeout(timeout);
  }
}

export function parseKiraJson<T>(content: string): T {
  const cleaned = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(cleaned.slice(start, end + 1)) as T;
      } catch {
        // Fall through to the normalized error below.
      }
    }
    throw new KiraError("Phản hồi AI không đúng định dạng JSON.", 502);
  }
}

export function jsonError(error: unknown) {
  const normalized = error instanceof KiraError
    ? error
    : new KiraError("Đã xảy ra lỗi máy chủ.");
  return Response.json(
    { error: normalized.message, details: normalized.details },
    { status: normalized.status },
  );
}

export function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}
