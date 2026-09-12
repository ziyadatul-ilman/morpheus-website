import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

// =====================================================================================
// KERENTANAN PRAKTIKUM: SQL INJECTION (SQLi)
// ---------------------------------------------------------------------------------
// Endpoint ini SENGAJA menyusun query SQL dengan STRING CONCATENATION langsung dari
// input pengguna (query param `q`), TANPA parameterized query / prepared statement,
// dan TANPA sanitasi/escaping input.
//
// Contoh eksploitasi (lihat CHEATSHEET.md untuk detail lengkap):
//   GET /api/students/search?q=' OR '1'='1
//   GET /api/students/search?q=' UNION SELECT username,password,3,4,5,6 FROM admin_users-- -
//
// CARA MEMPERBAIKI (untuk didiskusikan di kelas):
//   Ganti query di bawah dengan parameterized query, misalnya:
//     const [rows] = await pool.query(
//       "SELECT id, full_name, nickname, role_title, expertise, photo_file " +
//       "FROM students WHERE full_name LIKE ? ORDER BY full_name ASC",
//       [`%${q}%`]
//     );
//   Library mysql2 otomatis melakukan escaping saat placeholder (?) dipakai dengan benar.
// =====================================================================================

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  const pool = getPool();

  // --- VULNERABLE QUERY (SENGAJA, untuk praktikum SQLi) --------------------------
  const query =
    "SELECT id, full_name, nickname, role_title, expertise, photo_file " +
    "FROM students WHERE full_name LIKE '%" + q + "%' ORDER BY full_name ASC";
  // ---------------------------------------------------------------------------------

  try {
    const [rows] = await pool.query(query);
    return NextResponse.json({ students: rows, debug_query: query });
  } catch (err) {
    // Pesan error database sengaja ditampilkan agar siswa bisa mempelajari
    // bagaimana error-based SQLi bisa membocorkan struktur database.
    return NextResponse.json(
      { students: [], error: err.message, debug_query: query },
      { status: 500 }
    );
  }
}
