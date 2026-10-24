import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Em Pauta Tech",
  description:
    "Gira um assunto de tecnologia, pesquisa por 10 minutos e fala por 1 minuto.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#15100d",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="shell">
          <header className="masthead">
            <h1 className="brand">
              Em pauta
              <span className="brand-tag">Tech</span>
            </h1>
            <p className="byline">
              Inspirado em{" "}
              <a
                href="https://instagram.com/mamejunqueira"
                target="_blank"
                rel="noopener noreferrer"
              >
                @mamejunqueira
              </a>
            </p>
            <nav aria-label="Principal">
              <Link href="/salvos" className="pill">
                Salvos →
              </Link>
            </nav>
          </header>

          {children}

          <footer className="footer">
            <p>
              Inspirado no trabalho de{" "}
              <a
                href="https://instagram.com/mamejunqueira"
                target="_blank"
                rel="noopener noreferrer"
              >
                @mamejunqueira
              </a>{" "}
              e{" "}
              <a
                href="https://instagram.com/bitterbuilds"
                target="_blank"
                rel="noopener noreferrer"
              >
                @bitterbuilds
              </a>
              .
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
