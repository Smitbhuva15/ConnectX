"use client"
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import useGetCallById from '../../../../../hooks/useGetCallById'
import {  StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import Loader from '@/components/Loader'
import MeetingSetup from '@/components/meeting/MeetingSetup'
import MeetingRoom from '@/components/meeting/MeetingRoom'

export default function Meeting() {
  const { id } = useParams()
  const { isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;
  

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme >
          {
            isSetupComplete ?
              (
                <MeetingRoom 
              
                />
              )
              :
              (
                < MeetingSetup 
                setIsSetupComplete={setIsSetupComplete}
                />
              )

          }

        </StreamTheme>
      </StreamCall>
    </main>
  )
}
