import * as XLSX from "xlsx";

const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MAX_ROWS = 2_000;

function findValue(row: Record<string, unknown>, aliases: string[]) {
  const normalized = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [
      key.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase(),
      value,
    ]),
  );
  for (const alias of aliases) {
    const value = normalized[alias];
    if (value !== undefined && value !== null) return String(value).trim();
  }
  return "";
}

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Không tìm thấy file Excel." }, { status: 400 });
  }
  if (file.size > MAX_FILE_BYTES) {
    return Response.json({ error: "File vượt quá giới hạn 2 MB." }, { status: 413 });
  }

  try {
    const workbook = XLSX.read(await file.arrayBuffer(), { type: "array", cellDates: false });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    if (!sheet) return Response.json({ error: "File không có worksheet." }, { status: 400 });
    const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });
    if (raw.length > MAX_ROWS) {
      return Response.json({ error: `Chỉ hỗ trợ tối đa ${MAX_ROWS} học sinh mỗi lần.` }, { status: 413 });
    }

    const errors: string[] = [];
    const students = raw.map((row, index) => {
      const studentId = findValue(row, ["mssv", "ma hoc sinh", "ma hs", "student id"]);
      const fullName = findValue(row, ["ho ten", "ho va ten", "ten hoc sinh", "full name"]);
      const className = findValue(row, ["lop", "class", "class name"]);
      if (!studentId || !fullName || !className) errors.push(`Dòng ${index + 2}: thiếu MSSV, Họ tên hoặc Lớp.`);
      return { studentId, fullName, className };
    }).filter(item => item.studentId && item.fullName && item.className);

    return Response.json({ students, errors: errors.slice(0, 20), total: raw.length });
  } catch {
    return Response.json({ error: "Không đọc được file. Hãy dùng mẫu Excel đúng định dạng." }, { status: 400 });
  }
}
