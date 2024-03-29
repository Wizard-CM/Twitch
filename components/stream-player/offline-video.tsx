import { WifiOff } from 'lucide-react'
import React from 'react'

interface OfflineVideoProps {
  username: string;
}
export const OfflineVideo = ({username}:OfflineVideoProps) => {
  return (
    <div className=" flex h-full flex-col space-y-4 justify-center items-center ">
    <WifiOff className="h-10 w-10 text-muted-foreground" />
    <p className="text-muted-foreground">{username}</p>
  </div>
  )
}

