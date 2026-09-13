import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-pastel-pink/30 to-cream px-6 py-12 md:py-20">
      {/* Pattern Titik-Titik Background */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: `24px 24px`
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:justify-between">
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

          {/* Badge Statistik Pastel */}
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2 rounded-2xl bg-pastel-pink/60 px-4 py-2 text-xs font-semibold text-ink shadow-pill md:text-sm">
              👥 <span>32 Siswa</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-pastel-mint/60 px-4 py-2 text-xs font-semibold text-ink shadow-pill md:text-sm">
              🛠️ <span>6 Pengurus Kelas</span>
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

        {/* Frame Foto Kelas */}
        <div className="w-full max-w-md md:w-1/2">
          <div className="overflow-hidden rounded-3xl border border-pastel-lavender/50 bg-white p-3 shadow-xl">
            <img 
              src="/img/class-photo.jpg" 
              alt="XI TKJ 3 Class Photo" 
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}