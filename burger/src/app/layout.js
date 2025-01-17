import { Roboto } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const roboto = Roboto({
    variable: "--font-geist-sans",
   subsets: ["latin"],
   weight: ['400','500','700',]

})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={roboto.className}>
          <main className="max-w-4xl mx-auto p-4">
        {children}

          </main>
      </body>
    </html>
  );
}
