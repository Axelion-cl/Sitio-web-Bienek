import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bienek - Soluciones Integrales de Limpieza e Higiene Industrial",
  description: "Proveedor líder en Chile de productos y soluciones de limpieza e higiene para empresas. Equipamiento, insumos profesionales, maquinaria y servicios especializados para industria, salud, HORECA y más.",
  keywords: ["limpieza industrial", "higiene", "productos de limpieza", "Chile", "Bienek", "soluciones de limpieza", "equipamiento", "maquinaria", "consultoría"],
  authors: [{ name: "Bienek" }],
  creator: "Bienek",
  publisher: "Bienek",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://bienek.cl",
    siteName: "Bienek",
    title: "Bienek - Soluciones Integrales de Limpieza e Higiene Industrial",
    description: "Proveedor líder en Chile de productos y soluciones de limpieza e higiene para empresas.",
    images: [
      {
        url: "https://bienek.cl/assets/images/home/hero.webp",
        width: 1200,
        height: 630,
        alt: "Bienek - Soluciones de Limpieza"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bienek - Soluciones Integrales de Limpieza",
    description: "Proveedor líder en Chile de productos y soluciones de limpieza e higiene para empresas.",
    images: ["https://bienek.cl/assets/images/home/hero.webp"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} antialiased flex flex-col min-h-screen`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
