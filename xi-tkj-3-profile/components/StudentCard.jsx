"use client";

// Warna badge keahlian dibedakan per bidang supaya gampang dibedakan sekilas
const EXPERTISE_STYLES = {
  "Network & System Administration": "bg-pastel-blue/70 text-ink",
  "Cyber Security": "bg-pastel-mint/70 text-ink",
};

const ROLE_STYLES = {
  "Ketua Kelas": "bg-pastel-pink-deep text-white",
  "Wakil Ketua Kelas": "bg-pastel-lavender-deep text-white",
  "Sekretaris 1": "bg-pastel-yellow-deep text-ink",
  "Sekretaris 2": "bg-pastel-yellow-deep text-ink",
  "Bendahara 1": "bg-pastel-mint-deep text-ink",
  "Bendahara 2": "bg-pastel-mint-deep text-ink",
};

export default function StudentCard({ student }) {
  const expertiseStyle =
    EXPERTISE_STYLES[student.expertise] || "bg-pastel-lavender/70 text-ink";
  const roleStyle = ROLE_STYLES[student.role_title];

  return (
    <div className="group flex flex-col items-center rounded-3xl border border-pastel-lavender/40 bg-white p-5 text-center shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
      {roleStyle && (
        <span
          className={`mb-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-pill ${roleStyle}`}
        >
          {student.role_title}
        </span>
      )}

      <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-pastel-pink/50 bg-pastel-blue/30 shadow-pill flex items-center justify-center">
        <img
          src={`/students/${student.photo_file}`}
          alt={student.full_name}
          width={96}
          height={96}
          className="h-full w-full object-cover"
        />
</div>

      <h3 className="mt-4 font-display text-base font-semibold text-ink">
        {student.full_name}
      </h3>

      <span
        className={`mt-2 rounded-full px-3 py-1 text-xs font-medium ${expertiseStyle}`}
      >
        {student.expertise}
      </span>

      <a
        href={`/student/${student.id}`}
        className="mt-4 w-full rounded-full bg-pastel-lavender/70 py-2 text-sm font-semibold text-ink transition hover:bg-pastel-lavender-deep hover:text-white"
      >
        Lihat Profil
      </a>
    </div>
  );
}
