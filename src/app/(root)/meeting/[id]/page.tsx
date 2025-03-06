"use client"
import { useParams } from 'next/navigation'
import React from 'react'

export default function Meeting() {
    const {id}=useParams()
  return (
    <div className='text-white'>Meeting {id}</div>
  )
}
