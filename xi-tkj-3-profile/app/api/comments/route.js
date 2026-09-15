import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

// GET: Ambil daftar komentar siswa dari MariaDB
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId');

  try {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT id, author_name, content, created_at FROM comments WHERE student_id = ? ORDER BY id DESC',
      [studentId]
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// =====================================================================================
// KERENTANAN PRAKTIKUM: STORED CROSS-SITE SCRIPTING (XSS)
// ---------------------------------------------------------------------------------
// Endpoint ini menyimpan komentar APA ADANYA (tanpa strip tag HTML / sanitasi) ke
// kolom `content`. Payload berbahaya akan tersimpan permanen di database dan
// dieksekusi di browser SETIAP kali komentar itu ditampilkan (lihat
// components/CommentSection.jsx yang merender dengan dangerouslySetInnerHTML).
// =====================================================================================

export async function POST(request) {
  const body = await request.json();
  const { studentId, authorName, author, content, text } = body;

  const finalAuthor = authorName || author;
  const finalContent = content || text;

  if (!studentId || !finalAuthor || !finalContent) {
    return NextResponse.json(
      { error: "studentId, authorName/author, dan content/text wajib diisi" },
      { status: 400 }
    );
  }

  const pool = getPool();

  try {
    // Fitur Pembatasan Maksimal 50 Komentar per Siswa
    const [countRows] = await pool.query(
      'SELECT COUNT(*) as total FROM comments WHERE student_id = ?',
      [studentId]
    );

    if (countRows[0].total >= 50) {
      return NextResponse.json(
        { error: 'Batas maksimal 50 komentar untuk siswa ini telah tercapai!' },
        { status: 400 }
      );
    }

    // Insert komentar (sengaja tanpa sanitasi untuk skenario XSS praktikum)
    const [result] = await pool.query(
      "INSERT INTO comments (student_id, author_name, content) VALUES (?, ?, ?)",
      [studentId, finalAuthor, finalContent]
    );

    const [rows] = await pool.query(
      "SELECT id, author_name, content, created_at FROM comments WHERE id = ?",
      [result.insertId]
    );

    return NextResponse.json(rows[0]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}