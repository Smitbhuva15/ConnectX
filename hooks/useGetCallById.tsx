import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react'

export default function useGetCallById(id: string | string[]|undefined) {

    const [call, setCall] = useState<Call>();
    const [isCallLoading, setIsCallLoading] = useState(true);

    const client = useStreamVideoClient();

    useEffect(() => {

        const genrateCall = async () => {
            if (!client) return;

            try {
                const { calls } = await client.queryCalls({ filter_conditions: { id } });

                if (calls.length > 0) setCall(calls[0]);


            } catch (error) {
                console.log(error)
            }
            finally {
                setIsCallLoading(false)
            }

        }
        genrateCall()
    }, [client, id])
 
    return{call,isCallLoading};
}
