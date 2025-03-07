import CallList from '@/components/meeting/CallList'
import React from 'react'

export default function Previous() {
  return (
 <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Previous Meeting</h1>

      <CallList type="ended" />
      </section>
  )
}
