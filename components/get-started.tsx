"use client"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function GetStarted(){
    const navigate = useRouter();
    function handleGetStarted(){
      navigate.push("/protected")
      toast.success("Thank you for getting started")
    }

  return <Button variant="secondary" onClick={handleGetStarted}>Get Started</Button>
}