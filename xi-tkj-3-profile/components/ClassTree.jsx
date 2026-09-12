"use client";

import { MOCK_STUDENTS } from "@/lib/mockStudents";

// Mengambil data spesifik pengurus dari MOCK_STUDENTS berdasarkan id / nama
export default function ClassTree() {
  // Cari data pengurus berdasarkan ID atau role (sesuai data di mockStudents.js)
  const waliKelas = {
    name: "Wali Kelas XI TKJ 3",
    role: "Wali Kelas",
    photo: "/students/wali-kelas.jpg", // Ganti jika ada foto wali kelas
  };

  const ketua = MOCK_STUDENTS.find((s) => s.role_title === "Ketua Kelas") || {
    full_name: "Ketua Kelas",
    photo_file: "davin.jpg",
  };

  const wakil = MOCK_STUDENTS.find((s) => s.role_title === "Wakil Ketua Kelas") || {
    full_name: "Wakil Ketua",
    photo_file: "kemal.jpg",
  };

  const sekretaris1 = MOCK_STUDENTS.find((s) => s.role_title === "Sekretaris 1") || {
    full_name: "Sekretaris 1",
    photo_file: "ilmi.jpg",
  };

  const sekretaris2 = MOCK_STUDENTS.find((s) => s.role_title === "Sekretaris 2") || {
    full_name: "Sekretaris 2",
    photo_file: "radine.jpg",
  };

  const bendahara1 = MOCK_STUDENTS.find((s) => s.role_title === "Bendahara 1") || {
    full_name: "Bendahara 1",
    photo_file: "gusto.jpg",
  };

  const bendahara2 = MOCK_STUDENTS.find((s) => s.role_title === "Bendahara 2") || {
    full_name: "Bendahara 2",
    photo_file: "intan.jpg",
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* 1. LEVEL WALI KELAS */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center rounded-2xl border border-pastel-lavender/40 bg-white p-4 shadow-card transition hover:-translate-y-1">
          <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-pastel-yellow-deep/50 bg-pastel-blue/30 shadow-pill mb-2">
            <img
              src={waliKelas.photo}
              alt={waliKelas.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/students/siswa-02.jpg";
              }}
            />
          </div>
          <span className="rounded-full bg-pastel-yellow-deep px-3 py-0.5 text-[10px] font-semibold text-ink shadow-pill uppercase tracking-wide">
            {waliKelas.role}
          </span>
          <h3 className="mt-2 font-display text-sm font-semibold text-ink">
            {waliKelas.name}
          </h3>
        </div>
      </div>

      {/* Garis Pembagi Level 1 */}
      <div className="h-6 w-0.5 bg-pastel-lavender/60"></div>

      {/* 2. LEVEL KETUA & WAKIL KETUA */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* KETUA KELAS */}
        <div className="flex flex-col items-center rounded-2xl border border-pastel-lavender/40 bg-white p-4 shadow-card transition hover:-translate-y-1 w-44 text-center">
          <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-pastel-pink-deep/50 bg-pastel-blue/30 shadow-pill mb-2">
            <img
              src={`/students/${ketua.photo_file}`}
              alt={ketua.full_name}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="rounded-full bg-pastel-pink-deep px-3 py-0.5 text-[10px] font-semibold text-white shadow-pill uppercase tracking-wide">
            Ketua Kelas
          </span>
          <h4 className="mt-2 font-display text-sm font-semibold text-ink">
            {ketua.full_name}
          </h4>
        </div>

        {/* WAKIL KETUA KELAS */}
        <div className="flex flex-col items-center rounded-2xl border border-pastel-lavender/40 bg-white p-4 shadow-card transition hover:-translate-y-1 w-44 text-center">
          <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-pastel-lavender-deep/50 bg-pastel-blue/30 shadow-pill mb-2">
            <img
              src={`/students/${wakil.photo_file}`}
              alt={wakil.full_name}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="rounded-full bg-pastel-lavender-deep px-3 py-0.5 text-[10px] font-semibold text-white shadow-pill uppercase tracking-wide">
            Wakil Ketua
          </span>
          <h4 className="mt-2 font-display text-sm font-semibold text-ink">
            {wakil.full_name}
          </h4>
        </div>
      </div>

      {/* Garis Pembagi Level 2 */}
      <div className="h-6 w-0.5 bg-pastel-lavender/60"></div>

      {/* 3. LEVEL SEKRETARIS & BENDAHARA */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
        {/* SEKRETARIS 1 */}
        <div className="flex flex-col items-center rounded-2xl border border-pastel-lavender/40 bg-white p-3 shadow-card transition hover:-translate-y-1 text-center">
          <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-pastel-yellow-deep bg-pastel-blue/30 shadow-pill mb-2">
            <img
              src={`/students/${sekretaris1.photo_file}`}
              alt={sekretaris1.full_name}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="rounded-full bg-pastel-yellow-deep px-2.5 py-0.5 text-[9px] font-semibold text-ink uppercase tracking-wide">
            Sekretaris 1
          </span>
          <h4 className="mt-1.5 font-display text-xs font-semibold text-ink">
            {sekretaris1.full_name}
          </h4>
        </div>

        {/* SEKRETARIS 2 */}
        <div className="flex flex-col items-center rounded-2xl border border-pastel-lavender/40 bg-white p-3 shadow-card transition hover:-translate-y-1 text-center">
          <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-pastel-yellow-deep bg-pastel-blue/30 shadow-pill mb-2">
            <img
              src={`/students/${sekretaris2.photo_file}`}
              alt={sekretaris2.full_name}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="rounded-full bg-pastel-yellow-deep px-2.5 py-0.5 text-[9px] font-semibold text-ink uppercase tracking-wide">
            Sekretaris 2
          </span>
          <h4 className="mt-1.5 font-display text-xs font-semibold text-ink">
            {sekretaris2.full_name}
          </h4>
        </div>

        {/* BENDAHARA 1 */}
        <div className="flex flex-col items-center rounded-2xl border border-pastel-lavender/40 bg-white p-3 shadow-card transition hover:-translate-y-1 text-center">
          <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-pastel-mint-deep bg-pastel-blue/30 shadow-pill mb-2">
            <img
              src={`/students/${bendahara1.photo_file}`}
              alt={bendahara1.full_name}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="rounded-full bg-pastel-mint-deep px-2.5 py-0.5 text-[9px] font-semibold text-ink uppercase tracking-wide">
            Bendahara 1
          </span>
          <h4 className="mt-1.5 font-display text-xs font-semibold text-ink">
            {bendahara1.full_name}
          </h4>
        </div>

        {/* BENDAHARA 2 */}
        <div className="flex flex-col items-center rounded-2xl border border-pastel-lavender/40 bg-white p-3 shadow-card transition hover:-translate-y-1 text-center">
          <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-pastel-mint-deep bg-pastel-blue/30 shadow-pill mb-2">
            <img
              src={`/students/${bendahara2.photo_file}`}
              alt={bendahara2.full_name}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="rounded-full bg-pastel-mint-deep px-2.5 py-0.5 text-[9px] font-semibold text-ink uppercase tracking-wide">
            Bendahara 2
          </span>
          <h4 className="mt-1.5 font-display text-xs font-semibold text-ink">
            {bendahara2.full_name}
          </h4>
        </div>
      </div>
    </div>
  );
}