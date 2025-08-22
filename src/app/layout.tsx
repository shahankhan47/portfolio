import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-800 text-white font-sans z-10">
        <header className="p-6 flex justify-between items-center z-10">
          <h1 className="text-xl font-medium z-10">Shahan Ali Khan</h1>
          <nav className="space-x-6 z-10">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="relative p-6 text-center text-gray-400 z-20">© 2025 My Portfolio</footer>
      </body>
    </html>
  );
}
