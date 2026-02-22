"use server";

import { createClient } from "@/lib/supabase/server";

export type userHabitsType = {
  id: string;
  created_at: string;
  user_id: string;
  last_updated: string;
  streak: number;
  habit_name: string;
  habit_type: string;
  is_active: boolean;
};

export type userLog = userHabitsType & {
  habit_log: { id: string; created_at: string; log: string }[];
};

export async function getUserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return null;
  }

  return data.claims;
}

export async function addNewHabit(newHabit: {
  habit_name: string;
  habit_type: string;
  user_id: string;
}) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("habits").insert(newHabit);
    if (error) {
      throw new Error(error.message);
    }
    return { status: "success", error: null };
  } catch (e) {
    console.error(e);
    return { status: "error", error: e };
  }
}

export async function getUserHabits() {
  const supabase = await createClient();
  const { data: habits } = await supabase.from("habits").select();
  return habits as userHabitsType[];
}

export async function deleteHabit(habit_id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("habits")
    .delete()
    .eq("id", habit_id);

  if (error) {
    console.log(error);
    return { status: "error" };
  }
  return { status: "success" };
}

export async function editHabit(
  habit_id: string,
  editedHabit: { habit_name: string; habit_type: string },
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("habits")
    .update(editedHabit)
    .eq("id", habit_id);
  if (error) {
    console.error(error.message);
    return { status: "error" };
  } else {
    return { status: "success" };
  }
}

export async function getHabitLogDetails(today:string) {
  const supabase = await createClient();
  const { data: habit_log, error } = await supabase
    .from("habits")
    .select(
      `
  id,
  created_at,
  user_id,
  last_updated,
  streak,
  habit_name,
  habit_type,
  is_active,
  habit_log (id, created_at, log)
    `,
    )
    .eq("habit_log.created_at", today);
  if (error) console.error(error);
  return habit_log as userLog[];
}

export async function removeHabitLog(log_id: string){
  const supabase = await createClient();
  const {data, error} = await supabase.from('habit_log').delete().eq('id', log_id)
  if(error) console.error(error.message)
}

export async function addHabitLog(habit_id: string, date: string) {
  const supabase = await createClient();
  const {data, error} = await supabase.from('habit_log').insert({habit_id: habit_id, created_at: date, log: "done"})
  console.log(data)
}