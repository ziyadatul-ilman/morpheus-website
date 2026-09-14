'use client';

import { useState, useEffect } from 'react';

export default function CommentSection({ studentId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userCode, setUserCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Inisialisasi USN 'User#123' per Pengunjung & Load Komentar
  useEffect(() => {
    let savedCode = localStorage.getItem('morpheus_user_code');
    if (!savedCode) {
      // Generate angka acak 3-4 digit (contoh: User#4829)
      const randomNum = Math.floor(100 + Math.random() * 9000);
      savedCode = `User#${randomNum}`;
      localStorage.setItem('morpheus_user_code', savedCode);
    }
    setUserCode(savedCode);

    // Load komentar dari LocalStorage
    const storageKey = `comments_student_${studentId}`;
    const savedComments = localStorage.getItem(storageKey);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [studentId]);

  // 2. Fungsi Kirim Komentar
  const handleAddComment = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newComment.trim()) return;

    // Batas Maksimal 50 Komentar per Siswa
    if (comments.length >= 50) {
      setErrorMsg('Batas maksimal 50 komentar untuk siswa ini telah tercapai!');
      return;
    }

    const commentObj = {
      id: Date.now(),
      author: userCode, // Menggunakan format User#123
      text: newComment.trim(),
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updatedComments = [commentObj, ...comments];
    setComments(updatedComments);

    // Simpan ke LocalStorage
    const storageKey = `comments_student_${studentId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));

    setNewComment('');
  };

  // 3. Fungsi Hapus Komentar
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((c) => c.id !== commentId);
    setComments(updatedComments);

    const storageKey = `comments_student_${studentId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));
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
                  👤 {item.author}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-ink-soft">{item.date}</span>
                  
                  {/* Tombol Hapus (Hanya muncul jika komentar dibuat oleh user tersebut) */}
                  {item.author === userCode && (
                    <button
                      onClick={() => handleDeleteComment(item.id)}
                      title="Hapus komentar ini"
                      className="text-red-400 hover:text-red-600 transition text-xs pl-1"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
              <p className="text-ink leading-relaxed whitespace-pre-line">{item.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}