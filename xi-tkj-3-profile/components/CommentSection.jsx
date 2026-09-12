"use client";

import { useState } from "react";

// =====================================================================================
// KERENTANAN PRAKTIKUM: STORED CROSS-SITE SCRIPTING (XSS) — tetap dipertahankan
// meski tampilan sudah diganti ke tema pastel. Komentar disimpan lewat /api/comments
// (POST) lalu dirender kembali dengan `dangerouslySetInnerHTML` TANPA sanitasi, supaya
// siswa tetap bisa mendemonstrasikan payload seperti <img onerror=...> pada komentar.
// Lihat CHEATSHEET.md untuk panduan pengujian & cara memperbaikinya.
// =====================================================================================

export default function CommentSection({ studentId, initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, authorName: name, content }),
      });
      const data = await res.json();
      if (data.comment) {
        setComments((prev) => [data.comment, ...prev]);
      } else {
        // Fallback lokal kalau DB belum siap, supaya UI tetap terasa hidup
        setComments((prev) => [
          {
            id: `local-${Date.now()}`,
            author_name: name,
            content,
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
      setName("");
      setContent("");
    } catch (e) {
      setComments((prev) => [
        {
          id: `local-${Date.now()}`,
          author_name: name,
          content,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      setName("");
      setContent("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-10 rounded-3xl border border-pastel-lavender/40 bg-white p-6 shadow-card sm:p-8">
      <h2 className="mb-5 font-display text-lg font-bold text-ink">
        💬 Komentar &amp; Ucapan
      </h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Nama kamu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-2xl border-2 border-pastel-lavender/40 bg-cream/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-pastel-pink-deep focus:outline-none"
        />
        <textarea
          placeholder="Tulis komentar..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="w-full rounded-2xl border-2 border-pastel-lavender/40 bg-cream/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-pastel-pink-deep focus:outline-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-pastel-pink-deep px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-card disabled:opacity-50"
        >
          {submitting ? "Mengirim..." : "Kirim Komentar"}
        </button>
      </form>

      <div className="space-y-3">
        {comments.length === 0 && (
          <p className="text-sm text-ink-faint">Belum ada komentar. Jadilah yang pertama! 🎀</p>
        )}
        {comments.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-pastel-blue/40 bg-pastel-blue/10 p-4"
          >
            <p className="mb-1 text-xs font-semibold text-pastel-blue-deep">
              {c.author_name}
            </p>
            {/* VULNERABLE (sengaja): rendering raw HTML dari input pengguna tanpa sanitasi */}
            <div
              className="text-sm text-ink-soft"
              dangerouslySetInnerHTML={{ __html: c.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
