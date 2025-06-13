import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Weather App",
  description: "Weather App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'var(--font-geist-sans)',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #ffaf7b 0%, #d76d77 50%, #3a1c71 100%)',
        }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
