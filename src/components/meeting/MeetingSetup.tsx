import { useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";


type setIsSetupCompleteprops={
    setIsSetupComplete:(value:boolean)=>void
}


export default function MeetingSetup({setIsSetupComplete}:setIsSetupCompleteprops) {

    const call = useCall();

    if (!call) {
        throw new Error(
          'useStreamCall must be used within a StreamCall component.',
        );
      }
      const [isMicCamToggled, setIsMicCamToggled] = useState(false);

      useEffect(() => {
        if (isMicCamToggled) {
          call.camera.disable();
          call.microphone.disable();
        } else {
          call.camera.enable();
          call.microphone.enable();
        }
      }, [isMicCamToggled, call.camera, call.microphone]);


  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
        <h1 className="text-center text-2xl font-bold">Setup</h1>
        <VideoPreview />
        <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => {setIsMicCamToggled(e.target.checked)
                console.log(e)
            }}
          />
          Join with mic and camera off
        </label>

        
        
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();

          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  )
}
