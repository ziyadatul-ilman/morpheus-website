// lib/db.js
// Koneksi pool ke MariaDB menggunakan library mysql2 (kompatibel dengan protokol MariaDB).
//
// CATATAN PRAKTIKUM:
// Pool koneksi ini sendiri aman (menggunakan environment variables, bukan kredensial hardcoded).
// Kerentanan SQL Injection SENGAJA ditempatkan di lapisan query (lihat app/api/students/search/route.js),
// bukan di file ini, supaya siswa bisa membandingkan cara pakai yang benar (parameterized query)
// vs cara yang salah (string concatenation).

import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "tkj3_user",
      password: process.env.DB_PASSWORD || "tkj3_password",
      database: process.env.DB_NAME || "xi_tkj_3_profile",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      namedPlaceholders: true,
    });
  }
  return pool;
}

// Contoh helper AMAN (parameterized query) - dipakai di halaman-halaman normal
// yang TIDAK dijadikan target praktikum SQLi.
export async function getAllStudents() {
  const [rows] = await getPool().query(
    "SELECT id, full_name, nickname, role_title, expertise, photo_file FROM students ORDER BY full_name ASC"
  );
  return rows;
}

export async function getStudentById(id) {
  const [rows] = await getPool().query(
    "SELECT * FROM students WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] || null;
}

export async function getCommentsByStudentId(studentId) {
  const [rows] = await getPool().query(
    "SELECT id, author_name, content, created_at FROM comments WHERE student_id = ? ORDER BY created_at DESC",
    [studentId]
  );
  return rows;
}
