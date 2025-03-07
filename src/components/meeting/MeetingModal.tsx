import React, { ReactNode } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import Image from 'next/image'
import { Button } from '../ui/button'

type meetingprops = {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  image?: string;
  className?: string;
  buttonText?: string;
  buttonIcon?: string
  title: string
  handelmeeting?:()=>void
}

export default function MeetingModal({
  children,
  open,
  onClose,
  image,
  className,
  buttonText,
  buttonIcon,
  title,
  handelmeeting

}: meetingprops) {
  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogTitle ></DialogTitle>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        {image && (
          <div className="flex justify-center">
            <Image src={image} alt="checked" width={72} height={72} />
          </div>
        )}
        <h1 className={`text-3xl font-bold leading-[42px] ${className}`}>
          {title}
        </h1>
        {children}

        <Button className={"bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"}
        onClick={handelmeeting}
        >
          {buttonIcon ? (
            <>
            <Image
              src={buttonIcon}
              alt="button icon"
              width={13}
              height={13}
            />
            <div>{buttonText || "Schedule Meeting"}</div>
            </>

          )
            :
            (<>{buttonText || "Schedule Meeting"}</>)

          }
        </Button>

      </DialogContent>
    </Dialog>
  )
}
