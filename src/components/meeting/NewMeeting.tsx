"use client"
import React, { useEffect, useState } from 'react'
import HomeCart from './HomeCart'
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Textarea } from '../ui/textarea';
import ReactDatePicker from "react-datepicker";
import { Input } from '../ui/input';


const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

export default function NewMeeting() {
  const [meeting, setMeeting] = useState<'New Meeting' | 'Join Meeting' | 'Schedule Meeting' | undefined>();
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const router = useRouter()


  const { user, isLoaded } = useUser()
  const client = useStreamVideoClient();

  const createmeeting = async () => {

    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast.error('Please select a date and time');
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
      toast.error('Failed to create Meeting');
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  const handelredording = () => {
    router.push('/recordings')
  }


  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCart
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className='bg-orange-1'
        handelmeeting={() => { setMeeting('New Meeting') }}
      />
      <HomeCart
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handelmeeting={() => { setMeeting('Join Meeting') }}
      />

      <HomeCart
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handelmeeting={() => { setMeeting('Schedule Meeting') }}
      />

      <HomeCart
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handelmeeting={handelredording}
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

      {
        meeting === 'Join Meeting' &&
        (
          <MeetingModal
            open={meeting === "Join Meeting"}
            title="Join Meeting"
            className="text-center"
            buttonText="Start Meeting"
            onClose={() => setMeeting(undefined)}
            handelmeeting={()=>router.push(values?.link)}
          >
             <Input
              placeholder="Meeting link"
             onChange={(e)=>setValues({...values,link:e.target.value})}
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            </MeetingModal>
        )
      }
      {meeting === "Schedule Meeting" && (
        !callDetail ? (
          <MeetingModal
            open={meeting === "Schedule Meeting"}
            title="Create Meeting"
            onClose={() => setMeeting(undefined)}
            handelmeeting={createmeeting}
          >
            <div className="flex flex-col gap-2.5">
              <label className="text-base font-normal leading-[22.4px] text-sky-2">
                Add a description
              </label>
              <Textarea
                className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
            </div>
            <div className="flex w-full flex-col gap-2.5">
              <label className="text-base font-normal leading-[22.4px] text-sky-2">
                Select Date and Time
              </label>
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded bg-dark-3 p-2 focus:outline-none"
              />
            </div>

          </MeetingModal>
        )
          :
          (
            <MeetingModal
              open={meeting === "Schedule Meeting"}
              title="Meeting Created"
              className="text-center"
              buttonText="Copy Meeting Link"
              onClose={() => setMeeting(undefined)}
              image={'/icons/checked.svg'}
              buttonIcon="/icons/copy.svg"
              handelmeeting={() => {
                navigator.clipboard.writeText(meetingLink);
                toast.success('Link Copied');
              }}
            />
          )
      )

      }
    </div>
  )
}
