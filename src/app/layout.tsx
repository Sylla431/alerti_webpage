import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Alerti - L'alerte qui sauve des vies | Prévention des inondations au Mali",
  description: "Système d'alerte précoce contre les inondations au Mali. Capteurs intelligents, prévisions météo et alertes SMS pour protéger les populations à risque.",
  keywords: "inondations, Mali, alerte, prévention, capteurs, SMS, météo, sécurité",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/android-chrome-192x192.png',
        sizes: '192x192'
      },
      {
        rel: 'icon', 
        url: '/android-chrome-512x512.png',
        sizes: '512x512'
      }
    ]
  },
  openGraph: {
    title: "Alerti - L'alerte qui sauve des vies",
    description: "Système d'alerte précoce contre les inondations au Mali",
    images: ['/logo_long.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Alerti - L'alerte qui sauve des vies",
    description: "Système d'alerte précoce contre les inondations au Mali",
    images: ['/logo_long.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased font-poppins`}
      >
        {children}
      </body>
    </html>
  );
}
