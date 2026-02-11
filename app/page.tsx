"use client"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const navigate = useRouter();
  function handleGetStarted(){
    navigate.push("/protected")
    toast.success("Thank you for getting started")
  }
  return (
    <main className="min-h-screen flex flex-col items-center">
      
      <Button variant="secondary" onClick={handleGetStarted}>Get Started</Button>
    </main>
  );
}
