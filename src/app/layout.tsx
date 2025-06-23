import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ 
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo"
});

export const metadata: Metadata = {
  title: "وش آكل؟ - اختار وجبتك في الرياض",
  description: "تطبيق تفاعلي يساعدك في اختيار ما تأكله في الرياض، السعودية",
  keywords: "طعام، وجبات، الرياض، السعودية، مطاعم، عشاء، غداء",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-cairo antialiased`}>
        {children}
      </body>
    </html>
  );
}
