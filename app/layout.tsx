import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Style Quiz",
  description: "Квиз с определением стиля и регистрацией"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur">
            <div className="container flex h-14 items-center justify-between">
              <a href="/" className="text-lg font-semibold">AI Style Quiz</a>
              <nav className="text-sm text-white/70">
                <a className="hover:text-white" href="/quiz">Пройти квиз</a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/10 py-6 text-center text-white/50">© {new Date().getFullYear()} Quiz</footer>
        </div>
      </body>
    </html>
  );
}
