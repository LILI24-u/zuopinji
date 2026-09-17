import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Jack -- 3D Creator",description:"Jack's selected 3D, motion, branding and digital design projects.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
