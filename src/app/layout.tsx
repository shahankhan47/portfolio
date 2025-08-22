import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans">
        <header className="p-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">My Portfolio</h1>
          <nav className="space-x-6">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="p-6 text-center text-gray-400">© 2025 My Portfolio</footer>
      </body>
    </html>
  );
}
