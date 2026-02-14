"use client"
import GetStarted from "@/components/get-started"
import Image from "next/image"
export default function Hero(){
  
  return (
    <div className="overflow-clip w-screen h-screen mx-auto relative">
      <Image 
      src={"/hero-md.jpg"}
      alt="hero picture"
      width={1920}
      height={1280}
      className=""/>
      <div className="absolute z-20 top-0 left-1/2 transform -translate-x-1/2 w-9/10 md:w-4/5 h-4/5 flex pt-10 justify-between items-end ">
        <h1 className="text-2xl md:text-5xl font-bold text-white w-110 wrap-normal ">Reclaiming your life in a world filled with Distractions</h1>
        <div className="flex flex-col items-end gap-5">
          <p className="w-110 wrap-normal text-end text-white">we merge traditional habit tracking, with modern habit tracking to restore your discipline to top form</p>
          <GetStarted/>
        </div>
      </div>
      <div className="w-full h-full inset-0 absolute z-10 bg-black/30"></div>
    </div>
  )
}