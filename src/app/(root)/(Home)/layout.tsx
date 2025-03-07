import NavBar from "@/components/Common/NavBar";
import SideBar from "@/components/Common/SideBar";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "ConnectX High-Quality Virtual Meetings",
  description: "Next-Level Video Conferencing",
};

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="relative">
        <NavBar />
  
        <div className="flex">
         
          <SideBar />
          <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
            <div className="w-full">{children}</div>
          </section>
        </div>
      </main>
    );
  }