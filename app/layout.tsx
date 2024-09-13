import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Kanit({ weight: "300" ,subsets: ["latin"],  });

export const metadata: Metadata = {
  title: "AI COACH",
  description: "PERSONAL AI GYM COACH",
  manifest: "/manifest.json",
  icons: { apple: "/icon-192x192.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    

    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
   
 

   
  );
}
