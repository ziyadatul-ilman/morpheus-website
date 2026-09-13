'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-pastel-lavender/60 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Brand di Pojok Kiri Atas */}
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-pastel-pink text-base shadow-pill">
            🎒
          </span>
          <span>
            XI TKJ <span className="text-pastel-lavender-deep">3</span> <span className="text-sm font-normal text-ink-soft">| Cyber Security</span>
          </span>
        </Link>

        {/* Navigation Deskop */}
        <nav className="hidden items-center gap-2 text-sm font-medium text-ink-soft sm:flex">
          <Link
            href="/"
            className="rounded-full px-4 py-2 transition hover:bg-pastel-pink/60 hover:text-ink"
          >
            Beranda
          </Link>
          <Link
            href="/#struktur"
            className="rounded-full px-4 py-2 transition hover:bg-pastel-blue/60 hover:text-ink"
          >
            Struktur Kelas
          </Link>
          <Link
            href="/#siswa"
            className="rounded-full px-4 py-2 transition hover:bg-pastel-mint/60 hover:text-ink"
          >
            Daftar Siswa
          </Link>
          <Link
            href="/gallery"
            className="rounded-full px-4 py-2 transition hover:bg-pastel-pink/60 hover:text-ink"
          >
            Galeri Foto
          </Link>
        </nav>

        {/* Tombol Hamburger (Hanya Tampil di Layar HP/Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-pastel-lavender/40 text-ink sm:hidden"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Dropdown Menu Mobile */}
      {isOpen && (
        <div className="border-t border-pastel-lavender/40 bg-cream px-6 py-4 sm:hidden">
          <nav className="flex flex-col gap-2 text-sm font-medium text-ink-soft">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-2.5 transition hover:bg-pastel-pink/60 hover:text-ink"
            >
              Beranda
            </Link>
            <Link
              href="/#struktur"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-2.5 transition hover:bg-pastel-blue/60 hover:text-ink"
            >
              Struktur Kelas
            </Link>
            <Link
              href="/#siswa"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-2.5 transition hover:bg-pastel-mint/60 hover:text-ink"
            >
              Daftar Siswa
            </Link>
            <Link
              href="/gallery"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-2.5 transition hover:bg-pastel-pink/60 hover:text-ink"
            >
              Galeri Foto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}