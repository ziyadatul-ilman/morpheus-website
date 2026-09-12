import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// =====================================================================================
// KERENTANAN PRAKTIKUM: PATH TRAVERSAL / LOCAL FILE INCLUSION (LFI)
// ---------------------------------------------------------------------------------
// Endpoint ini SENGAJA mengambil nama file dari query parameter `file` dan langsung
// menggabungkannya ke direktori foto siswa TANPA validasi/sanitasi path sama sekali
// (tidak ada whitelist, tidak ada pengecekan "..", tidak ada path.resolve + cek base dir).
//
// Contoh eksploitasi (lihat CHEATSHEET.md untuk detail lengkap):
//   GET /api/avatar?file=student1.jpg                     -> perilaku normal
//   GET /api/avatar?file=../../../../etc/passwd           -> baca file sistem (Linux)
//   GET /api/avatar?file=../../../.env                    -> baca file konfigurasi aplikasi
//
// CARA MEMPERBAIKI (untuk didiskusikan di kelas):
//   1. Whitelist nama file (misal hanya izinkan pola /^[a-zA-Z0-9_-]+\.(jpg|png)$/).
//   2. Gunakan path.basename(userInput) untuk membuang komponen direktori.
//   3. Setelah resolve path absolut, pastikan hasilnya masih berada di dalam base dir
//      yang diizinkan (bandingkan dengan path.resolve(baseDir)).
// =====================================================================================

const STUDENTS_DIR = path.join(process.cwd(), "public", "students");

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file") || "";

  // --- VULNERABLE PATH BUILDING (SENGAJA, untuk praktikum LFI / Path Traversal) --
  const targetPath = path.join(STUDENTS_DIR, file);
  // Tidak ada validasi bahwa targetPath masih berada di dalam STUDENTS_DIR!
  // ---------------------------------------------------------------------------------

  try {
    const buffer = await fs.readFile(targetPath);
    const ext = path.extname(targetPath).toLowerCase();
    const contentType =
      ext === ".png"
        ? "image/png"
        : ext === ".gif"
        ? "image/gif"
        : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : "text/plain"; // file non-gambar (hasil eksploitasi LFI) ditampilkan sebagai teks

    return new NextResponse(buffer, {
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Gagal membaca file: ${err.message}`, requested_path: targetPath },
      { status: 404 }
    );
  }
}
