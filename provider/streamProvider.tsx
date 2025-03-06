"use client"
import { useUser } from "@clerk/nextjs";
import {
    StreamVideo,
    StreamVideoClient,
} from "@stream-io/video-react-sdk";

import { ReactNode, useEffect, useState } from "react";
import tokenProvider from "../action/streamaction";
import Loader from "@/components/Loader";


const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;


const StreamProvider = ({ children }: { children: ReactNode }) => {

    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const { user, isLoaded } = useUser()

   
    useEffect(() => {
        if (!isLoaded || !user) return;
        if (!API_KEY) throw new Error('Stream API key is missing');
    
        const client = new StreamVideoClient({
          apiKey: API_KEY,
          user: {
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl,
          },
          tokenProvider,
        });
    
        setVideoClient(client);
      }, [user, isLoaded]);

    if(!videoClient) return <Loader />

    return (
        <StreamVideo client={videoClient}>{children}</StreamVideo>
    );
};

export default StreamProvider