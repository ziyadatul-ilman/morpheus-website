-- schema.sql
-- Skema database untuk Website Profil Kelas XI TKJ 3
-- PERINGATAN: skema & kode aplikasi ini SENGAJA dibuat rentan untuk kebutuhan praktikum keamanan aplikasi web.

CREATE DATABASE IF NOT EXISTS xi_tkj_3_profile CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE xi_tkj_3_profile;

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS students;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  class_name VARCHAR(20) NOT NULL DEFAULT 'XI TKJ 3',
  role_title VARCHAR(50) NOT NULL DEFAULT 'Anggota',
  expertise VARCHAR(100) NOT NULL,
  skills VARCHAR(255) NOT NULL,
  interests VARCHAR(255) NOT NULL,
  goals VARCHAR(255) NOT NULL,
  description TEXT,
  photo_file VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel comments: dipakai untuk demo Stored XSS (input TIDAK disanitasi saat ditampilkan)
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  author_name VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
