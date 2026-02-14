"use client"
import { Button } from "@/components/ui/button";
import {ArrowRight} from "lucide-react"
import { useRouter } from "next/navigation";
export default function GetStarted(){
    const navigate = useRouter();
    function handleGetStarted(){
      navigate.push("/protected")
    }

  return <Button variant="secondary" className="rounded-xl" onClick={handleGetStarted}>Begin Your Habit Tracking <span className="rounded-full bg-accent-foreground p-1"><ArrowRight className="text-accent"/></span></Button>
}