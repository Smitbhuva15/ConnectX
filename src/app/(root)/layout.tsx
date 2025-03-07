
import StreamProvider from "../../../provider/streamProvider";
import { Toaster } from 'react-hot-toast';
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
