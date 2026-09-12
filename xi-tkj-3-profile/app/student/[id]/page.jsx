import Navbar from "@/components/Navbar";
import CommentSection from "@/components/CommentSection";
import { getStudentById, getCommentsByStudentId } from "@/lib/db";
import { MOCK_STUDENTS } from "@/lib/mockStudents";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function StudentDetailPage({ params }) {
  let student = null;
  let comments = [];

  try {
    student = await getStudentById(params.id);
    if (student) {
      comments = await getCommentsByStudentId(student.id);
    }
  } catch (err) {
    console.error("DB belum siap, memakai mock data:", err.message);
  }

  // Fallback ke data dummy kalau DB belum siap / siswa tidak ditemukan di DB
  if (!student) {
    student = MOCK_STUDENTS.find((s) => String(s.id) === String(params.id)) || null;
  }

  if (!student) return notFound();

  const skills = Array.isArray(student.skills)
    ? student.skills
    : (student.skills || "").split(",").map((s) => s.trim()).filter(Boolean);

  const interests = Array.isArray(student.interests)
    ? student.interests.join(", ")
    : student.interests;

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <a
          href="/#siswa"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-ink-soft transition hover:text-pastel-pink-deep"
        >
          ← Kembali ke daftar siswa
        </a>

        <div className="grid gap-8 rounded-4xl border border-pastel-lavender/40 bg-white p-6 shadow-card sm:grid-cols-[220px_1fr] sm:p-8">
          <div className="mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-pastel-pink/50 bg-pastel-blue/30 shadow-pill sm:h-full sm:w-full sm:rounded-3xl">
            <img
              src={`/api/avatar?file=${encodeURIComponent(student.photo_file)}`}
              alt={student.full_name}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            {student.role_title && student.role_title !== "Anggota" && (
              <span className="mb-2 inline-block rounded-full bg-pastel-lavender-deep px-3 py-1 text-xs font-semibold text-white shadow-pill">
                {student.role_title}
              </span>
            )}
            <h1 className="font-display text-3xl font-bold text-ink">
              {student.full_name}
            </h1>
            <p className="mt-1 text-sm font-medium text-pastel-pink-deep">
              &ldquo;{student.nickname}&rdquo; &middot; {student.class_name}
            </p>
            <span className="mt-2 inline-block rounded-full bg-pastel-mint/60 px-3 py-1 text-xs font-semibold text-ink">
              {student.expertise}
            </span>

            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {student.description}
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-pastel-blue-deep">
                  Skill Set
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-pastel-blue/50 px-3 py-1 text-xs font-medium text-ink"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-pastel-lavender-deep">
                  Minat &amp; Hobi
                </h3>
                <p className="text-sm text-ink-soft">{interests}</p>
              </div>

              <div className="sm:col-span-2">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-pastel-pink-deep">
                  Cita-cita
                </h3>
                <p className="text-sm text-ink-soft">{student.goals}</p>
              </div>
            </div>
          </div>
        </div>

        <CommentSection studentId={student.id} initialComments={comments} />
      </section>
    </main>
  );
}
