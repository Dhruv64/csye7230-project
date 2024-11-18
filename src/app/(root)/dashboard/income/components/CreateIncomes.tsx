"use client";
import React, { useState,useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { IncomeParams } from "../../../../../../types";

interface CreateIncomesProps {
  id: string;
}

function CreateIncomes(CreateIncomesProps: CreateIncomesProps) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const {id} =CreateIncomesProps;

  const { user } = useUser();

  const [income, setIncome] = useState<IncomeParams>({
    name: "",
    amount: 0,
    icon: "😀",
    createdBy:`${id}`
  });

   // Update income state when id prop changes
   useEffect(() => {
    setIncome(prev => ({ ...prev, createdBy: id }));
  }, [id]);


  const onCreateIncomes = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(income);
    try {
      const response = await fetch('/api/income/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(income)
      });

      if (response.ok) {
        toast("New Income Source Created!");
      } else {
        toast("Failed to create Income Source");
      }
    } catch (error) {
      console.error(error);
      toast("An error occurred while creating the Income Source");
    }
  }

  
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 p-10 rounded-2xl
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Income Source</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Income Source</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setIncome({ ...income, icon: e.emoji });
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Source Name</h2>
                  <Input
                    placeholder="e.g. Youtube"
                    onChange={(e) => setIncome({...income, name: e.target.value})}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Montly Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 5000$"
                    onChange={(e) => setIncome({...income, amount: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={income.amount === 0 || income.name === ""}
                className="mt-5 w-full rounded-full"
                onClick={onCreateIncomes}
              >
                Create Income Source
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateIncomes;