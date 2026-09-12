import Navbar from "@/components/Navbar";
import { classNamePhotos } from "@/lib/mockStudents";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="rounded-full bg-pastel-pink/60 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-ink shadow-pill">
              Galeri Momen
            </span>
            <h1 className="mt-3 font-display text-4xl font-extrabold text-ink">
              Dokumentasi XI TKJ 3 📸
            </h1>
            <p className="mt-2 text-sm text-ink-faint">
              Kumpulan kenangan dan kegiatan seru anak-anak Morpheus!
            </p>
          </div>

          {/* Grid Foto */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classNamePhotos.map((photo) => (
              <div
                key={photo.id}
                className="group overflow-hidden rounded-3xl border border-pastel-lavender/40 bg-white p-4 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="h-48 w-full overflow-hidden rounded-2xl bg-pastel-blue/20">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 px-1">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {photo.title}
                  </h3>
                  <p className="mt-1 text-xs text-ink-faint">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}