"use client";
import { Inter } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

import "./globals.css";
import { AuthProvider } from "@/contexts/authContext";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Diamond Estate",
//   description: "A real estate company that provides the best services",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className="flex flex-col min-h-screen bg-white px-20">
        <div className="h-20 px-20">
          <Navbar />
        </div>
        <AuthProvider className="flex-1 border-t-4 mt-4 border-black">{children}</AuthProvider>
        <div className="footer pt-8 bottom-0 w-full font-semibold ">
          <Footer />
        </div>
      </body>
    </html>
  );
}
