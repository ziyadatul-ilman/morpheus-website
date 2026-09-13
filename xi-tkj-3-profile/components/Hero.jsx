import Link from 'next/link';
import HeroImage from './HeroImage';

export default function Hero({ totalStudents = 32, totalBoard = 6 }) {
  return (
    <section className="relative overflow-hidden bg-cream px-6 py-12 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:justify-between">
        {/* Konten Kiri */}
        <div className="flex-1 space-y-6 text-left">
          <span className="inline-block rounded-full bg-pastel-yellow/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink shadow-pill">
            SMK TELKOM MALANG
          </span>

          <h1 className="font-display text-4xl font-extrabold text-ink md:text-5xl">
            XI TKJ <span className="rounded-2xl bg-pastel-lavender/60 px-3 py-1 text-pastel-lavender-deep">3 - Morpheus</span>
          </h1>

          <h2 className="font-display text-lg font-semibold text-pastel-blue-deep md:text-xl">
            Class Portfolio & Student Profile
          </h2>

          <p className="max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
            Selamat datang di portofolio digital kelas XI TKJ 3! Ini adalah kelas expertise Cyber Security. Kami kumpulan siswa yang bersemangat belajar jaringan komputer dan keamanan siber. Yuk kenalan lebih dekat dengan teman-teman satu kelas!
          </p>

          {/* Badge Statistik (32 Siswa & 6 Pengurus Kelas) */}
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2 rounded-2xl bg-pastel-pink/60 px-4 py-2 text-xs font-semibold text-ink shadow-pill md:text-sm">
              👥 <span>{totalStudents} Siswa</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-pastel-mint/60 px-4 py-2 text-xs font-semibold text-ink shadow-pill md:text-sm">
              🛠️ <span>{totalBoard} Pengurus Kelas</span>
            </div>
          </div>

          {/* Tombol CTA */}
          <div className="pt-4">
            <Link
              href="#siswa"
              className="inline-block rounded-full bg-pastel-pink px-6 py-3 font-medium text-ink shadow-pill transition hover:opacity-90"
            >
              Lihat Daftar Siswa →
            </Link>
          </div>
        </div>

        {/* Komponen Foto Asli */}
        <div className="w-full max-w-md md:w-1/2">
          <HeroImage />
        </div>
      </div>
    </section>
  );
}