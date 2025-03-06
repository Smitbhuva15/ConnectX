import { Main } from "next/document";

import StreamProvider from "../../../provider/streamProvider";
import toast, { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


    <main>
      <StreamProvider>
        {children}
      </StreamProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </main>
  );
}
