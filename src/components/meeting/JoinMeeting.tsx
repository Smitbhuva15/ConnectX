import React, { useEffect, useState } from 'react'
import HomeCart from './HomeCart'


export default function JoinMeeting() {
    const [meeting,setMeeting]=useState<'Join Meeting'|undefined>();
    
  return (
    <div>
         <HomeCart 
                 img="/icons/join-meeting.svg"
                 title="Join Meeting"
                 description="via invitation link"
                 className="bg-blue-1"
                 handelmeeting={()=>{setMeeting('Join Meeting')}}
             />
          
    </div>
  )
}
