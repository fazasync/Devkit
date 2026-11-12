import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppShell } from "@/components/layout/app-shell";
import { CommandPalette } from "@/components/shared/command-palette";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevKit — Universal Developer Toolkit",
  description:
    "Build faster. Develop smarter. Essential developer utilities in one unified workspace.",
};

const themeInitScript = `(function(){try{var raw=localStorage.getItem('devkit-theme');var theme='dark';if(raw){try{theme=JSON.parse(raw).state.theme||'dark';}catch(e){}}var dark=theme==='dark'||(theme==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(dark)document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
          <CommandPalette />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}