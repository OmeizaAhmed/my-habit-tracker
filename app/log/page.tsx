import { Suspense } from "react";
import { getUserDetails } from "../actions/actions";
import { redirect } from "next/navigation";
import LogHabit from "@/components/log-user-habits";

export default async function Log() {
  async function IsLogIn() {
    const userDetails = await getUserDetails();
    if (!userDetails) redirect("/auth/login");
    return <></>;
  }

  return (
    <main className="flex flex-col items-center pt-8">
      <Suspense>
        <IsLogIn />
      </Suspense>
      <h1 className="font-bold text-2xl mb-4">Welcome to Log Page</h1>
      <LogHabit />
    </main>
  );
}
