import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

// =====================================================================================
// KERENTANAN PRAKTIKUM: STORED CROSS-SITE SCRIPTING (XSS)
// ---------------------------------------------------------------------------------
// Endpoint ini menyimpan komentar APA ADANYA (tanpa strip tag HTML / sanitasi) ke
// kolom `content`. Payload berbahaya akan tersimpan permanen di database dan
// dieksekusi di browser SETIAP kali komentar itu ditampilkan (lihat
// components/CommentSection.jsx yang merender dengan dangerouslySetInnerHTML).
//
// Query INSERT di bawah menggunakan parameterized query (aman dari SQLi),
// jadi kerentanan di endpoint ini murni ada di sisi RENDERING (frontend),
// bukan di query database — ini contoh bagus untuk mengajarkan siswa bahwa
// SQLi dan XSS adalah dua kerentanan berbeda yang harus ditangani terpisah.
//
// CARA MEMPERBAIKI (untuk didiskusikan di kelas):
//   Sanitasi `content` sebelum disimpan DAN/ATAU escape saat render (jangan pakai
//   dangerouslySetInnerHTML untuk data yang berasal dari input pengguna).
// =====================================================================================

export async function POST(request) {
  const body = await request.json();
  const { studentId, authorName, content } = body;

  if (!studentId || !authorName || !content) {
    return NextResponse.json(
      { error: "studentId, authorName, dan content wajib diisi" },
      { status: 400 }
    );
  }

  const pool = getPool();

  try {
    const [result] = await pool.query(
      "INSERT INTO comments (student_id, author_name, content) VALUES (?, ?, ?)",
      [studentId, authorName, content] // <- content disimpan tanpa sanitasi HTML (sengaja)
    );

    const [rows] = await pool.query(
      "SELECT id, author_name, content, created_at FROM comments WHERE id = ?",
      [result.insertId]
    );

    return NextResponse.json({ comment: rows[0] });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
