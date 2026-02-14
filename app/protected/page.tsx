import { redirect } from "next/navigation";

import { getUserDetails } from "../actions/actions";
import YourHabits from "@/components/get-user-habits";
import { AddNewHabit } from "@/components/add-new-habit";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";


export default async function ProtectedPage() {
  const userDetails = await getUserDetails()
  if(!userDetails) redirect("/auth/login")
  return (
    <div className="flex-1 w-full flex flex-col md:flex-row gap-12">
      <div className="flex flex-col gap-2 items-start min-w-100">
        <h2 className="font-bold text-2xl mb-4">Your Habits</h2>
          <YourHabits/>
      </div>
      <div className="min-w-100">
        <h2 className="font-bold text-2xl mb-4">Add a New Habit</h2>
        <AddNewHabit />
      </div>
    </div>
  );
}
