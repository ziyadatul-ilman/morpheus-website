export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="text-6xl">🌸</p>
      <p className="mt-4 font-display text-3xl font-bold text-ink">404</p>
      <p className="mt-2 text-sm text-ink-soft">
        Siswa / halaman tidak ditemukan.
      </p>
      <a
        href="/"
        className="mt-6 rounded-full bg-pastel-pink-deep px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
      >
        ← Kembali ke Beranda
      </a>
    </div>
  );
}
