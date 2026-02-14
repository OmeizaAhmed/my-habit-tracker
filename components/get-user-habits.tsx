"use client";
import { deleteHabit, getUserHabits } from "@/app/actions/actions";
import { useEffect, useState } from "react";
import type { userHabitsType } from "@/app/actions/actions";
import { Trash2, FilePenLine } from "lucide-react";
import { AlertDialogDestructive } from "./shadcn/AlertDialogDestructive";
import { toast } from "sonner";
import { EditDialogue } from "./shadcn/EditDialogue";

export default function YourHabits() {
  const [habits, setHabit] = useState<userHabitsType[]>([]);

  async function fetchUserHabit() {
    const userHabits = await getUserHabits();
    setHabit(userHabits);
  }
  useEffect(() => {
    fetchUserHabit();
  }, []);

  async function handleDeleteHabit(id: string) {
    const response = await deleteHabit(id);
    if (response.status === "success")
      toast.success("Habits has been deleted :)");
    else toast.error("Error deleting habit :(");
  }

  return (
    <ul>
      {habits?.length
        ? habits.map((habit: { id: string; habit_name: string; habit_type: string }) => (
            <li key={habit.id} className="flex gap-5">
              <span className="w-60 truncate">{habit.habit_name}</span>{" "}
              <span className="grid grid-cols-2 gap-3">
                {" "}
                <AlertDialogDestructive
                  buttonName={<Trash2 />}
                  habit_id={habit.id}
                  action={handleDeleteHabit}
                />{" "}
                <EditDialogue editValue={{habit_name: habit.habit_name, habit_type: habit.habit_type}} habit_id={habit.id}/>
              </span>
            </li>
          ))
        : null}
    </ul>
  );
}
