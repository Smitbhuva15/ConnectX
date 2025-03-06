import React from 'react'
import HomeCart from './HomeCart'

export default function MettingList() {
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <HomeCart  
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className='bg-orange-1'
        />
        <HomeCart 
         img="/icons/join-meeting.svg"
         title="Join Meeting"
         description="via invitation link"
         className="bg-blue-1"/>
        <HomeCart 
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"/>
        <HomeCart 
          img="/icons/recordings.svg"
          title="View Recordings"
          description="Meeting Recordings"
          className="bg-yellow-1"/>

    </section>
  )
}
