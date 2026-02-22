"use client";
import type { userHabitsType, userLog } from "@/app/actions/actions";
import { useState, useEffect } from "react";
import { addHabitLog, getHabitLogDetails, getUserHabits, removeHabitLog } from "@/app/actions/actions";
import { Loader, SendHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
export default function LogHabit() {
  const [habits, setHabit] = useState<userHabitsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [habitLogs, setHabitLogs] = useState<userLog[]>();

  async function fetchUserHabit() {
    const userHabits = await getUserHabits();
    setHabit(userHabits);
  }
  async function fetchHabitLogDetails() {
    const date = new Date()
    const dateString = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const logResult = await getHabitLogDetails(dateString);
    console.log(logResult);
    setHabitLogs(logResult);
  }
  function handlecheck(check: boolean, index: number, id: string, habit_id: string) {
    const cpyLog = habitLogs;
    if(cpyLog?.[index].habit_log.length){
      removeHabitLog(id);
      console.log(cpyLog?.[index]);
    } else {
      const date = new Date()
      const dateString = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      console.log({dateString, habit_id})
      addHabitLog(habit_id, dateString)
    }
    fetchHabitLogDetails()

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
        ? habitLogs.map((habit, index) => (
            <li key={habit.id}>
              {habit.habit_name}{" "}
              {habit.habit_type === "boolean" ? (
                <Checkbox
                  checked={habit?.habit_log[0]?.log ? true : false}
                  onCheckedChange={(check) =>
                    handlecheck(Boolean(check), index, habit?.habit_log[0]?.id, habit.id)
                  }
                />
              ) : (
                <div className="flex gap-2 items-center">
                  {habit.habit_type === "number"?<Input type={habit.habit_type} /> : <Textarea placeholder="write a message here"/>}
                  <SendHorizontal />
                </div>
              )}
            </li>
          ))
        : null}
    </ul>
  );
}


{
  /*
259a09ae-7283-4766-82b8-5f2bdfb16f22  
6e59e1bd-6364-4be4-8d7b-ab385897b0b6
982affdd-bf2b-4e36-ab35-304c75b77508
*/
}
