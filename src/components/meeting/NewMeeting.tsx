"use client"
import React, { useEffect, useState } from 'react'
import HomeCart from './HomeCart'
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

export default function NewMeeting() {
  const [meeting, setMeeting] = useState<'New Meeting' | undefined>();
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const router=useRouter()


  const {user,isLoaded}=useUser()
  const client=useStreamVideoClient();

  const createmeeting=async()=>{
    console.log("cccccccccccccccccc")

    if (!client || !user) return;
    
 

    try {
      if (!values.dateTime) {
        toast.error('Please select a date and time' );
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');

      const startsAt =
      values.dateTime.toISOString() || new Date(Date.now()).toISOString();
    const description = values.description || 'Instant Meeting';

    await call.getOrCreate({
      data: {
        starts_at: startsAt,
        custom: {
          description,
        },
      },
    });
    setCallDetail(call);

    if (!values.description) {
      router.push(`/meeting/${call.id}`);
    }
    
    toast.success('Meeting Created')
      
    } catch (error) {
      console.log(error)
      toast.error( 'Failed to create Meeting' );
    }
  }

  return (
    <div>
      <HomeCart
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className='bg-orange-1'
        handelmeeting={() => { setMeeting('New Meeting') }}
      />
      {
        meeting === 'New Meeting' &&
        (
          <MeetingModal
            open={meeting === "New Meeting"}
            title="Start an Instant Meeting"
            className="text-center"
            buttonText="Start Meeting"
            onClose={() => setMeeting(undefined)}
            handelmeeting={createmeeting}
          />
        )
      }
    </div>
  )
}
