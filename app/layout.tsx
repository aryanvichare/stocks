import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Stock Picker - RSCs & Shadcn/ui",
  description: "Demo app of a stock picker using RSCs & Shadcn/ui",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const fontSans = GeistSans;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased font-sans ${fontSans.variable}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
