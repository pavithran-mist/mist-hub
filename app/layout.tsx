import type { Metadata } from "next"; import "./globals.css";
export const metadata:Metadata={title:"MIST Hub | Learn • Connect • Grow",description:"A modern campus learning hub."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
