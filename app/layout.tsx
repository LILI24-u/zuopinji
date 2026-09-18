import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Lili — AIGC Designer",description:"Lili / 姜颖心 — AIGC creative designer. E-commerce visuals, AI video, digital humans and visual storytelling.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
