export async function GET() {
  const configured = Boolean(
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  return Response.json({
    configured,
    bucket: process.env.SUPABASE_SUBMISSIONS_BUCKET || "audio-submissions",
  });
}
