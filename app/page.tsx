
import GetStarted from "@/components/get-started";
import Header from "@/components/header";
import Image from "next/image";
import Hero from "./images/hero";

export default function Home() {

  return (
    <main className="min-h-screen relative">
      <Header />
      <div className="mx-auto">
      <Hero />
      </div>
    </main>
  );
}
