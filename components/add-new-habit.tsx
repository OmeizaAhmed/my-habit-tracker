"use client"
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { addNewHabit, getUserDetails } from "@/app/actions/actions";
import { toast } from "sonner";

export function AddNewHabit() {
  const [ habitForm, setHabitForm ] = useState({habit_name: "", habit_type: "boolean"})
  const [userId, setUserId] = useState('');
  async function handleSumbit(){
    const newHabit = {...habitForm, habit_name: habitForm.habit_name.trim(), user_id: userId}
    if(newHabit.habit_name && newHabit.habit_type && newHabit.user_id){
      const response = await addNewHabit(newHabit)
      console.log(newHabit)
      if(response.status === "success"){
        toast.success(`${newHabit.habit_name} has been added`)
      } else{
        toast.error("error adding new habit :(")
      }
    }
    handleReset();
  }

  function handleReset(){
    setHabitForm({habit_name: "", habit_type: "boolean"})
  }
  async function getUserId() {
    const userDetails = await getUserDetails();
    if(userDetails?.sub) setUserId(userDetails.sub)
  }
  useEffect(()=>{
    getUserId()
  }, [])
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Habit name</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Wake up by 6" required value={habitForm.habit_name} onChange={(event) => setHabitForm(prev => ({...prev, habit_name: event.target.value}))}/>
      </Field>

      
      <Field>
        <FieldLabel htmlFor="fieldgroup-type">Type</FieldLabel>
        <Select defaultValue="boolean" value={habitForm.habit_type} onValueChange={(value) => setHabitForm(prev => ({...prev, habit_type: value}))}>
          <SelectTrigger className="w-full max-w-48" id="fieldgroup-type">
            <SelectValue placeholder="Select a habit type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="boolean">Check</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="text">Text</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldDescription>
          We&apos;ll send updates to this address.
        </FieldDescription>
      </Field>
      <Field orientation="horizontal">
        <Button type="reset" variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button type="submit" onClick={handleSumbit}>Submit</Button>
      </Field>
    </FieldGroup>
  );
}
