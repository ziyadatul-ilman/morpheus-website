# XI TKJ 3 — Student Profile & Class Portfolio

Website profil kelas XI TKJ 3 dengan tema Cyber Security / Hacker Aesthetic,
dibangun dengan **Next.js (App Router)**, **React**, **Tailwind CSS**, dan
**MariaDB**. Aplikasi ini juga berfungsi sebagai media praktikum keamanan
aplikasi web — lihat [`CHEATSHEET.md`](./CHEATSHEET.md) untuk panduan
eksploitasi kerentanan yang sengaja ditanamkan.

> ⚠️ **PERINGATAN**: Aplikasi ini SENGAJA mengandung 3 kerentanan keamanan
> (SQL Injection, Stored XSS, Path Traversal/LFI) untuk kebutuhan praktikum.
> **Jangan deploy ke internet publik / production.** Gunakan hanya di
> lingkungan lokal atau lab tertutup.

## Fitur

- Hero section dengan info kelas & jumlah siswa
- Struktur organisasi kelas (pohon hierarki visual)
- Daftar siswa dengan pencarian live
- Halaman detail profil per siswa + kolom komentar
- 3 kerentanan praktikum yang diberi komentar jelas di kode (lihat `CHEATSHEET.md`)

## Struktur Folder

```
xi-tkj-3-profile/
├── app/
│   ├── page.jsx                     # Halaman utama
│   ├── layout.jsx
│   ├── globals.css
│   ├── not-found.jsx
│   ├── student/[id]/page.jsx        # Halaman detail siswa
│   └── api/
│       ├── students/search/route.js # [VULNERABLE] SQL Injection
│       ├── avatar/route.js          # [VULNERABLE] Path Traversal / LFI
│       └── comments/route.js        # Backend komentar (stored XSS di frontend)
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── ClassTree.jsx
│   ├── SearchBar.jsx
│   ├── StudentCard.jsx
│   └── CommentSection.jsx           # [VULNERABLE] Stored XSS (dangerouslySetInnerHTML)
├── lib/
│   └── db.js                        # Koneksi pool MariaDB (mysql2)
├── public/
│   ├── students/                    # Taruh foto siswa di sini
│   └── img/                         # Taruh foto kelas di sini
├── schema.sql                       # Struktur tabel
├── seed.sql                         # Data dummy 32 siswa XI TKJ 3
├── lab-rahasia.txt                  # Target demo untuk praktikum LFI
├── docker-compose.yml
├── Dockerfile
├── CHEATSHEET.md                    # Panduan eksploitasi untuk praktikum
└── .env.example
```

## Menjalankan dengan Docker (disarankan)

```bash
docker compose up --build
```

Ini akan menjalankan:
- **app** — Next.js di `http://localhost:3000`
- **db** — MariaDB di port `3306` (otomatis di-init dengan `schema.sql` + `seed.sql`)
- **adminer** — GUI database di `http://localhost:8080` (server: `db`, user: `tkj3_user`, password: `tkj3_password`, database: `xi_tkj_3_profile`)

## Menjalankan secara lokal (tanpa Docker)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Siapkan MariaDB lokal, lalu jalankan:
   ```bash
   mysql -u root -p < schema.sql
   mysql -u root -p < seed.sql
   ```
3. Salin `.env.example` menjadi `.env` dan sesuaikan kredensial database:
   ```bash
   cp .env.example .env
   ```
4. Jalankan development server:
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:3000`

## Melengkapi Foto

Tambahkan file `student1.jpg` s/d `student32.jpg` ke folder `public/students/`
(urutan sesuai `seed.sql`), dan `class-photo.jpg` ke `public/img/` untuk foto
kelas di Hero section. Jika file tidak ada, gambar akan gagal dimuat namun
aplikasi tetap berjalan normal.

## Kustomisasi

- **Nama sekolah**: ubah `NEXT_PUBLIC_SCHOOL_NAME` di `.env` atau
  `docker-compose.yml`.
- **Warna tema**: ubah palet di `tailwind.config.js` (bagian `theme.extend.colors.cyber`).
- **Data siswa**: edit langsung di `seed.sql`, atau lewat Adminer.

## Praktikum Keamanan

Lihat **[`CHEATSHEET.md`](./CHEATSHEET.md)** untuk panduan lengkap cara menguji
dan memperbaiki ketiga kerentanan (SQLi, Stored XSS, Path Traversal/LFI) yang
sengaja ditanamkan di aplikasi ini.
