const MAX_AUDIO_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_AUDIO_BUCKET || "audio-lessons";

  if (!supabaseUrl || !serviceKey) {
    return Response.json(
      { error: "Supabase Storage chưa được cấu hình." },
      { status: 503 },
    );
  }

  const form = await request.formData();
  const audio = form.get("audio");
  if (!(audio instanceof File) || !audio.type.startsWith("audio/")) {
    return Response.json({ error: "Vui lòng chọn file âm thanh hợp lệ." }, { status: 400 });
  }
  if (audio.size > MAX_AUDIO_BYTES) {
    return Response.json({ error: "File MP3 vượt quá giới hạn 10 MB." }, { status: 413 });
  }

  const safeName = audio.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-");
  const objectPath = `teacher/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;
  const endpoint = `${supabaseUrl}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath}`;
  const upload = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": audio.type || "audio/mpeg",
      "x-upsert": "false",
    },
    body: await audio.arrayBuffer(),
  });

  if (!upload.ok) {
    const detail = await upload.text();
    console.error("Supabase audio upload failed", upload.status, detail.slice(0, 300));
    return Response.json({ error: "Không thể tải MP3 lên Supabase Storage." }, { status: 502 });
  }

  return Response.json({
    url: `${supabaseUrl}/storage/v1/object/public/${encodeURIComponent(bucket)}/${objectPath}`,
    path: objectPath,
  });
}
