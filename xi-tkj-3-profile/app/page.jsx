import CommentSection from "@/components/CommentSection";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClassTree from "@/components/ClassTree";
import SearchBar from "@/components/SearchBar";
import { MOCK_STUDENTS } from "@/lib/mockStudents";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const finalStudents = MOCK_STUDENTS;

  return (
    <main className="bg-cream min-h-screen">
      <Navbar />

      {/* 1. Hero / Beranda (Background Pastel Pink) */}
      <Hero />

      {/* 2. Struktur Kelas (Background Pastel Lavender / Purple) */}
      <section id="struktur" className="relative overflow-hidden bg-gradient-to-b from-cream via-pastel-lavender/30 to-cream px-6 py-20">
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
            backgroundSize: `24px 24px`
          }}
        />
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <span className="rounded-full bg-pastel-lavender/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink shadow-pill">
              Organisasi
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
              Struktur Kelas 🌈
            </h2>
          </div>
          <ClassTree />
        </div>
      </section>

      {/* 3. Daftar Siswa (Background Pastel Mint / Green) */}
      <section id="siswa" className="relative overflow-hidden bg-gradient-to-b from-cream via-pastel-mint/30 to-cream px-6 py-20">
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
            backgroundSize: `24px 24px`
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="rounded-full bg-pastel-mint/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink shadow-pill">
              Anggota
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
              Daftar Siswa XI TKJ 3 - Morpheus 🌟
            </h2>
          </div>
          <SearchBar initialStudents={finalStudents} />
        </div>
      </section>

      {/* 4. Bagian Kolom Komentar (Tes XSS) */}
      <section id="komentar" className="relative overflow-hidden px-6 py-12">
        <div className="relative z-10 mx-auto max-w-4xl">
          <CommentSection />
        </div>
      </section>

      {/* 5. Footer (Background Warm Pastel Yellow) */}
      <footer className="relative border-t border-pastel-lavender/40 bg-pastel-yellow/20 px-6 py-8 text-center text-sm font-medium text-ink-soft">
        Dibuat dengan 💛 oleh XI TKJ 3 — Class Portfolio &amp; media praktikum keamanan aplikasi web
      </footer>
    </main>
  );
}