import Link from 'next/link';

export default function Hero({ maleCount = 0, femaleCount = 0, totalBoard = 6 }) {
  return (
    <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
      {/* Teks Kiri */}
      <div className="flex-1 space-y-6">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          SMK Telkom Malang
        </span>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
          XI TKJ <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-2xl">3 - Morpheus</span>
        </h1>
        
        <h2 className="text-xl font-semibold text-sky-400">
          Class Portfolio & Student Profile
        </h2>

        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
          Selamat datang di portofolio digital kelas XI TKJ 3! Kami adalah kumpulan siswa yang bersemangat belajar jaringan komputer dan keamanan siber. Yuk kenalan lebih dekat dengan teman-teman satu kelas. 🌸
        </p>

        {/* Badge Hitung Otomatis Laki-laki & Perempuan */}
        <div className="flex flex-wrap gap-3 pt-2">
          <div className="bg-blue-50 text-blue-600 border border-blue-100 px-4 py-2 rounded-2xl text-xs md:text-sm font-semibold flex items-center gap-2">
            👨‍💻 <span>{maleCount} Siswa Laki-laki</span>
          </div>
          <div className="bg-pink-50 text-pink-600 border border-pink-100 px-4 py-2 rounded-2xl text-xs md:text-sm font-semibold flex items-center gap-2">
            👩‍💻 <span>{femaleCount} Siswi Perempuan</span>
          </div>
          <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-2 rounded-2xl text-xs md:text-sm font-semibold flex items-center gap-2">
            🛠️ <span>{totalBoard} Pengurus Kelas</span>
          </div>
        </div>

        {/* Tombol CTA */}
        <div className="pt-4">
          <Link href="#siswa" className="inline-block bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition">
            Lihat Daftar Siswa →
          </Link>
        </div>
      </div>

      {/* Foto Kanan */}
      <div className="flex-1 w-full max-w-md md:max-w-none relative">
        <div className="bg-white p-3 rounded-3xl shadow-xl border border-pink-50 overflow-hidden">
          <img 
            src="/images/class-photo.jpg" 
            alt="XI TKJ 3 Class Photo" 
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}