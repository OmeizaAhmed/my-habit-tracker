"use client";
import type { userHabitsType, userLog } from "@/app/actions/actions";
import { useState, useEffect } from "react";
import { getHabitLogDetails, getUserHabits } from "@/app/actions/actions";
import { Loader, SendHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "./ui/input";
export default function LogHabit() {
  const [habits, setHabit] = useState<userHabitsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [habitLogs, setHabitLogs] = useState<userLog[]>()

  async function fetchUserHabit() {
    const userHabits = await getUserHabits();
    setHabit(userHabits);
  }
  async function fetchHabitLogDetails(){
    const logResult = await getHabitLogDetails();
    console.log(logResult)
    setHabitLogs(logResult)
  }
  useEffect(() => {
    setLoading(true);
    fetchUserHabit();
    fetchHabitLogDetails();
    setLoading(false);
  }, []);
  if (loading) return <Loader />;
  return (
    <ul className="flex flex-col gap-5">
      {habitLogs
        ? habitLogs.map((habit) => (
            <li key={habit.id}>
              {habit.habit_name}{" "}
              {habit.habit_type === "boolean" ? (
                <Checkbox checked={habit?.habit_log[0]?.log? true : false}/>
              ) : (
                <div className="flex gap-2 items-center">
                  <Input type={habit.habit_type} />
                  <SendHorizontal />
                </div>
              )}
            </li>
          ))
        : null}
    </ul>
  );
}

{/*
259a09ae-7283-4766-82b8-5f2bdfb16f22  
6e59e1bd-6364-4be4-8d7b-ab385897b0b6
982affdd-bf2b-4e36-ab35-304c75b77508
*/}