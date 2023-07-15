import './globals.css'
import type {Metadata} from 'next'
import {Inter, Red_Hat_Display} from 'next/font/google'
import Navbar from "@/components/navbar";

const inter = Inter({subsets: ['latin']})

const redHatDisplay = Red_Hat_Display({subsets: ['latin']})

export const metadata: Metadata = {
   title : "MystDev's Wiki"
}

export default function RootLayout(
   {
      children,
   }: {
      children: React.ReactNode
   }
) {
   return (
      <html lang="en">
      <body className={inter.className}>
      <main className="min-h-screen bg-slate-900 flex flex-col">
         <Navbar/>
         <div className={"max-w-screen-xl mx-auto"}>
            {children}
         </div>
      </main>
      </body>
      </html>
   )
}
