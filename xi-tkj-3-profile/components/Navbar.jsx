export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-pastel-lavender/60 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-pastel-pink text-base shadow-pill">
            🎒
          </span>
          <span>
            XI TKJ <span className="text-pastel-lavender-deep">3</span>
          </span>
        </a>
        <nav className="hidden items-center gap-2 text-sm font-medium text-ink-soft sm:flex">
          <a
            href="/#struktur"
            className="rounded-full px-4 py-2 transition hover:bg-pastel-blue/60 hover:text-ink"
          >
            Struktur Kelas
          </a>
          <a
            href="/#siswa"
            className="rounded-full px-4 py-2 transition hover:bg-pastel-mint/60 hover:text-ink"
          >
            Daftar Siswa
          </a>
          
          {/* TOMBOL GALERI FOTO DITAROH DI SINI */}
          <a
            href="/gallery"
            className="rounded-full px-4 py-2 transition hover:bg-pastel-pink/60 hover:text-ink"
          >
            Galeri Foto
          </a>
        </nav>
      </div>
    </header>
  );
}