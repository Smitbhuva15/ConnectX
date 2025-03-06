"use client"
import React, { useEffect, useState } from 'react'
import HomeCart from './HomeCart'
import NewMeeting from './NewMeeting'
import JoinMeeting from './JoinMeeting'
import ScheduleMetting from './ScheduleMetting'
import Recording from './Recording'

export default function MettingList() {


  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <NewMeeting />
      <JoinMeeting />
      <ScheduleMetting />
      <Recording />


    </section>
  )
}
