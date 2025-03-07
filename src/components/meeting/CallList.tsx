"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import useGetCall from '../../../hooks/useGetCall';
import { CallRecording } from '@stream-io/node-sdk';
import Loader from '../Loader';
import MeetingCard from './MeetingCard';
import { Call } from '@stream-io/video-react-sdk';

export default function CallList({ type }: { type: 'upcoming' | 'ended' | 'recording' }) {

    const router = useRouter();
    const { endedCalls, upcomingCalls, callRecordings, isLoading } =
        useGetCall();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);


    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recording':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    };

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'upcoming':
                return 'No Upcoming Calls';
            case 'recording':
                return 'No Recordings';
            default:
                return '';
        }
    };

    useEffect(() => {
        const fetchRecordings = async () => {
            if (!callRecordings) return; // Ensure it's not undefined or null
        
            try {
              const callData = await Promise.all(
                callRecordings.map((meeting) => meeting.queryRecordings())
              );
           
              const recordings = callData
                .filter((call) => call?.recordings?.length > 0)
                .flatMap((call) => call.recordings);
        
            
              setRecordings(recordings);
            } catch (error) {
              console.error("Error fetching recordings:", error);
            }
          };
        
          if (type === "recording") {
            fetchRecordings();
          }
      }, [type, callRecordings]);

    if (isLoading) return <Loader />;



    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {
                calls && calls.length > 0
                    ?
                    (
                        calls.map((meeting: Call | CallRecording) => (
                            <MeetingCard
                                key={(meeting as Call).id}
                                icon={
                                    type === 'ended'
                                        ? '/icons/previous.svg'
                                        : type === 'upcoming'
                                            ? '/icons/upcoming.svg'
                                            : '/icons/recordings.svg'
                                }

                                title={
                                    (meeting as Call).state?.custom?.description ||
                                    (meeting as CallRecording).filename?.substring(0, 20) ||
                                    'Personal Meeting'
                                }
                                date={
                                    (meeting as Call).state?.startsAt?.toLocaleString() ||
                                    (meeting as CallRecording).start_time?.toLocaleString()
                                }
                                link={
                                    type === 'recording'
                                        ? (meeting as CallRecording).url
                                        : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                                }

                                isPreviousMeeting={type === 'ended'}

                                buttonIcon1={type === 'recording' ? '/icons/play.svg' : undefined}
                                buttonText={type === 'recording' ? 'Play' : 'Start'}
                                handleClick={
                                    type === 'recording'
                                        ? () => router.push(`${(meeting as CallRecording).url}`)
                                        : () => router.push(`/meeting/${(meeting as Call).id}`)
                                }
                            />
                        ))

                    )
                    :
                    (
                        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
                    )
            }

        </div>
    )
}
