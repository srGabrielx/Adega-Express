import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import TopNoticeBar from "@/components/TopNoticeBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import AgeGateModal from "@/components/AgeGateModal";
import ToastContainer from "@/components/ToastContainer";

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Adega Express | Bebida Trincando em 15 Minutos na Sua Porta",
  description:
    "Peça cervejas trincando a -2°C, combos de Gin e Whisky, energéticos e petiscos com entrega ultrarrápida em até 15 minutos em Marabá - PA.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Adega Express - Delivery em 15 Minutos",
    description: "Cervejas a -2°C, combos e destilados entregues na sua porta.",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Logo Adega Express",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Script de limpeza de cache de Service Workers legados no Android */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister();
                  }
                });
                if ('caches' in window) {
                  caches.keys().then(function(names) {
                    for (let name of names) {
                      caches.delete(name);
                    }
                  });
                }
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <CartProvider>
          <TopNoticeBar />
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <WhatsAppFloating />
          <AgeGateModal />
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  );
}
