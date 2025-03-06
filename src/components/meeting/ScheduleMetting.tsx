import React, { useState } from 'react'
import HomeCart from './HomeCart'

export default function ScheduleMetting() {
  const [meeting, setMeeting] = useState<'Schedule Meeting' | undefined>();
  
  return (
    <div>
      <HomeCart
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handelmeeting={() => { setMeeting('Schedule Meeting') }}
      />
    </div>
  )
}
