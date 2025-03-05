import { Main } from "next/document";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


    <main>
      {children}
    </main>
  );
}
