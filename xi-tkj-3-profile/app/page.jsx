import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClassTree from "@/components/ClassTree";
import SearchBar from "@/components/SearchBar";
import { MOCK_STUDENTS } from "@/lib/mockStudents";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // PAKSA LANGSUNG PAKAI MOCK_STUDENTS
  // Agar web 100% membaca data & foto dari lib/mockStudents.js
  const finalStudents = MOCK_STUDENTS;
  const totalStudents = finalStudents.length;

  return (
    <main>
      <Navbar />
      <Hero totalStudents={totalStudents} />

      <section id="struktur" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <span className="rounded-full bg-pastel-lavender/60 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-ink shadow-pill">
              Organisasi
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink">
              Struktur Kelas 🌈
            </h2>
          </div>
          <ClassTree />
        </div>
      </section>

      <section id="siswa" className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="rounded-full bg-pastel-mint/60 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-ink shadow-pill">
              Anggota
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink">
              Daftar Siswa XI TKJ 3 - Morpheus 🌟
            </h2>
          </div>
          <SearchBar initialStudents={finalStudents} />
        </div>
      </section>

      <footer className="border-t border-pastel-lavender/40 bg-white px-6 py-8 text-center text-sm text-ink-faint">
        Dibuat dengan 💛 oleh XI TKJ 3 — Class Portfolio &amp; media
        praktikum keamanan aplikasi web
      </footer>
    </main>
  );
}