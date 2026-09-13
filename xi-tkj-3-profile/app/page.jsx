import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClassTree from "@/components/ClassTree";
import SearchBar from "@/components/SearchBar";
import { MOCK_STUDENTS } from "@/lib/mockStudents";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const finalStudents = MOCK_STUDENTS;
  
  // Hitung otomatis jumlah laki-laki dan perempuan dari data mock
  const maleCount = finalStudents.filter(
    (s) => s.gender === 'L' || s.gender === 'male' || s.gender === 'Laki-laki'
  ).length;
  
  const femaleCount = finalStudents.filter(
    (s) => s.gender === 'P' || s.gender === 'female' || s.gender === 'Perempuan'
  ).length;

  return (
    <main>
      <Navbar />
      <Hero 
        maleCount={maleCount || 20} 
        femaleCount={femaleCount || 12} 
        totalBoard={6} 
      />

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