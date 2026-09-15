'use client';

import { useState, useEffect } from 'react';

export default function CommentSection({ studentId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userCode, setUserCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Inisialisasi USN 'User#123' & Fetch Komentar dari MariaDB
  useEffect(() => {
    let savedCode = localStorage.getItem('morpheus_user_code');
    if (!savedCode) {
      const randomNum = Math.floor(100 + Math.random() * 9000);
      savedCode = `User#${randomNum}`;
      localStorage.setItem('morpheus_user_code', savedCode);
    }
    setUserCode(savedCode);

    fetchComments();
  }, [studentId]);

  // Fungsi untuk mengambil data dari MariaDB
  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?studentId=${studentId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Gagal mengambil komentar dari MariaDB:", err);
    }
  };

  // 2. Fungsi Kirim Komentar ke MariaDB
  const handleAddComment = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newComment.trim()) return;

    if (comments.length >= 50) {
      setErrorMsg('Batas maksimal 50 komentar untuk siswa ini telah tercapai!');
      return;
    }

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: studentId,
          authorName: userCode,
          content: newComment.trim()
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Ambil data terbaru dari database
        fetchComments();
        setNewComment('');
      } else {
        setErrorMsg(data.error || 'Gagal mengirim komentar');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke database MariaDB');
    }
  };

  return (
    <div className="mt-8 rounded-3xl border border-pastel-lavender/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between pb-4">
        <h3 className="font-display text-lg font-bold text-ink">
          💬 Pesan & Impression ({comments.length}/50)
        </h3>
        <span className="rounded-full bg-pastel-yellow/60 px-3 py-1 text-xs font-semibold text-ink">
          Kamu: <strong className="text-pastel-blue-deep">{userCode}</strong>
        </span>
      </div>

      {/* Form Input Komentar */}
      <form onSubmit={handleAddComment} className="mb-6 space-y-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Tulis pesan untuk siswa ini..."
          disabled={comments.length >= 50}
          rows={3}
          className="w-full rounded-2xl border border-pastel-lavender/60 p-3 text-sm text-ink focus:border-pastel-lavender focus:outline-none focus:ring-2 focus:ring-pastel-pink/40 disabled:bg-gray-100"
        />

        {errorMsg && (
          <p className="text-xs font-semibold text-red-500">{errorMsg}</p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={comments.length >= 50 || !newComment.trim()}
            className="rounded-full bg-pastel-pink px-5 py-2 text-xs font-bold text-ink shadow-pill transition hover:opacity-90 disabled:opacity-50"
          >
            Kirim Komentar 🚀
          </button>
        </div>
      </form>

      {/* Daftar Komentar */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <p className="text-center text-xs text-ink-soft italic py-4">
            Belum ada komentar. Jadilah yang pertama memberikan pesan!
          </p>
        ) : (
          comments.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-cream/60 p-3.5 text-xs border border-pastel-pink/20 flex flex-col justify-between gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-pastel-lavender-deep">
                  👤 {item.author_name}
                </span>
                <span className="text-[10px] text-ink-soft">
                  {new Date(item.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <p 
                className="text-ink leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}