"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import StudentCard from "./StudentCard";
import { MOCK_STUDENTS } from "@/lib/mockStudents";

export default function SearchBar({ initialStudents }) {
  const [query, setQuery] = useState("");
  const [dbStudents, setDbStudents] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialStudents && initialStudents.length > 0) {
      setDbStudents(initialStudents);
    }
  }, [initialStudents]);

  // LANGSUNG PAKAI MOCK_STUDENTS (TANPA USESTATE)
  // BIAR KALAU FILE DI-EDIT, GAMBAR LANGSUNG BERUBAH SEKETIKA
  const baseStudents = useMemo(
    () => (dbStudents && dbStudents.length > 0 ? dbStudents : MOCK_STUDENTS),
    [dbStudents]
  );

  const [results, setResults] = useState(baseStudents);

  useEffect(() => {
    setResults(baseStudents);
  }, [baseStudents]);

  const runServerSearch = useCallback(async (q) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/students/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.students && data.students.length > 0) {
        setResults(data.students);
        return;
      }
    } catch (e) {
      // API/DB belum siap — jatuh ke pencarian lokal
    } finally {
      setLoading(false);
    }
    
    const q2 = q.toLowerCase();
    setResults(
      MOCK_STUDENTS.filter((s) => s.full_name.toLowerCase().includes(q2))
    );
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim() === "") {
        setResults(baseStudents);
      } else {
        runServerSearch(query);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, baseStudents, runServerSearch]);

  return (
    <div>
      <div className="relative mx-auto mb-10 max-w-xl">
        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama siswa..."
          className="w-full rounded-full border-2 border-pastel-lavender/50 bg-white py-3.5 pl-12 pr-4 text-sm text-ink shadow-soft placeholder:text-ink-faint focus:border-pastel-pink-deep focus:outline-none"
        />
        {loading && (
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-ink-faint animate-pulse">
            mencari...
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {results.length === 0 && (
          <p className="col-span-full text-center text-sm text-ink-faint">
            Tidak ada siswa ditemukan. 🥲
          </p>
        )}
        {results.map((s) => (
          <StudentCard key={s.id} student={s} />
        ))}
      </div>
    </div>
  );
}