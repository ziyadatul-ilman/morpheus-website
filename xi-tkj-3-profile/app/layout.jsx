import "./globals.css";

export const metadata = {
  title: "XI TKJ 3 :: Class Portfolio",
  description:
    "Student Profile & Class Portfolio — XI TKJ 3. Light pastel edition.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-cream antialiased">{children}</body>
    </html>
  );
}
