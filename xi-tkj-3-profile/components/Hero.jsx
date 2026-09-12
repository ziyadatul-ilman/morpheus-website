"use client";

const SCHOOL_NAME = process.env.NEXT_PUBLIC_SCHOOL_NAME || "SMK Telkom Malang";

function StatPill({ emoji, label, value, color }) {
  const colorMap = {
    pink: "bg-pastel-pink/70 text-ink",
    blue: "bg-pastel-blue/70 text-ink",
    mint: "bg-pastel-mint/70 text-ink",
    lavender: "bg-pastel-lavender/70 text-ink",
    yellow: "bg-pastel-yellow/70 text-ink",
  };
  return (
    <div
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-pill ${colorMap[color]}`}
    >
      <span>{emoji}</span>
      <span>{value}</span>
      <span className="font-normal text-ink-soft">{label}</span>
    </div>
  );
}

export default function Hero({ totalStudents }) {
  return (
    <section className="relative overflow-hidden bg-dot-pastel">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-pastel-pink/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-24 h-56 w-56 rounded-full bg-pastel-blue/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-pastel-mint/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_1fr] md:items-center md:py-24">
        <div className="flex flex-col">
          <span className="mb-4 w-fit rounded-full bg-pastel-yellow/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink shadow-pill">
            {SCHOOL_NAME}
          </span>

          <h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
              XI TKJ <span className="rounded-2xl bg-pastel-lavender/60 px-3 py-1 text-pastel-lavender-deep">3 - Morpheus</span>
          </h1>

          <p className="mt-3 font-display text-xl font-semibold text-pastel-blue-deep">
            Class Portfolio &amp; Student Profile
          </p>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
            Selamat datang di portofolio digital kelas XI TKJ 3! Kami adalah
            kumpulan siswa yang bersemangat belajar jaringan komputer dan
            keamanan siber. Yuk kenalan lebih dekat dengan teman-teman satu
            kelas. 🌸
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <StatPill emoji="👥" value={totalStudents} label="Siswa" color="pink" />
            <StatPill emoji="🌐" value="2" label="Bidang Keahlian" color="blue" />
            <StatPill emoji="✨" value="6" label="Pengurus Kelas" color="mint" />
          </div>

          <a
            href="#siswa"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-pastel-pink-deep px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
          >
            Lihat Daftar Siswa
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-sm rotate-1 rounded-4xl border-4 border-white bg-white p-3 shadow-card">
            <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-pastel-pink/50 via-pastel-lavender/40 to-pastel-blue/50">
              <img
                src="/img/class-photo.jpg"
                alt="Foto Kelas XI TKJ 3"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextSibling.style.display = "flex";
                }}
              />
              <div className="hidden h-full w-full flex-col items-center justify-center gap-2 text-center text-ink-soft">
                <span className="text-4xl">📸</span>
                <p className="px-6 text-xs">
                  Taruh foto kelas di <br />
                  <code className="rounded bg-white/70 px-1.5 py-0.5 text-[10px]">
                    /public/img/class-photo.jpg
                  </code>
                </p>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 flex h-14 w-14 -rotate-6 items-center justify-center rounded-2xl bg-pastel-yellow text-2xl shadow-pill">
              🎓
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
