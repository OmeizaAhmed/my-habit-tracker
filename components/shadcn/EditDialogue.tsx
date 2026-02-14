"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilePenLine } from "lucide-react";
import { useState } from "react";
import { editHabit } from "@/app/actions/actions";
import { toast } from "sonner";

export function EditDialogue({
  editValue, habit_id
}: {
  editValue: { habit_name: string; habit_type: string };
  habit_id: string
}) {
  const [formData, setFormData] = useState(editValue);

  async function handleEdit() {
    console.log(formData);
    const copyFormData = formData
    copyFormData.habit_name = copyFormData.habit_name.trim()
    if(editValue.habit_name !== copyFormData.habit_name || editValue.habit_type !== copyFormData.habit_type){
      const { status } = await editHabit(habit_id, copyFormData);
      if(status === 'success') toast.success("Habit has been edit:)");
      else toast.error("Error editing Habit :(")
    }
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={()=>setFormData(editValue)}>
            <FilePenLine />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Habit</DialogTitle>
            <DialogDescription>
              Make changes to your habit here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                value={formData.habit_name}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    habit_name: event.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-type">Type</FieldLabel>
              <Select
                defaultValue={editValue.habit_type}
                value={formData.habit_type}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, habit_type: value }))
                }
              >
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
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={handleEdit}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
