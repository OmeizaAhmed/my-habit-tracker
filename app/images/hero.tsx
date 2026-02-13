"use client"
import GetStarted from "@/components/get-started"
import Image from "next/image"
export default function Hero(){
  
  return (
    <div className="overflow-clip w-9/10 w-4/5 mx-auto rounded-xl relative">
      <Image 
      src={"/hero-md.jpg"}
      alt="hero picture"
      width={1920}
      height={1280}/>
      <span className="absolute left-10 top-10"><GetStarted/></span>
    </div>
  )
}