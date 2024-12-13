"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { useToast } from "../../../../../hooks/use-toast"
import { IncomeParams } from "../../../../../../types";

interface CreateIncomesProps {
  id: string;
  onAddIncomes: (income: IncomeParams) => void;

}

function CreateIncomes({ id ,onAddIncomes}: CreateIncomesProps) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [income, setIncome] = useState<IncomeParams>({
    name: "",
    amount: 0,
    icon: "😀",
    createdBy: id
  });
  
  const { toast } = useToast()



  useEffect(() => {
    setIncome(prev => ({ ...prev, createdBy: id }));
  }, [id]);

  const onCreateIncomes = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/income/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(income)
      });

      if (response.ok) 
        {


          toast({
            description: "Income Source created successfully",
          });

          onAddIncomes(income);


          setIsDialogOpen(false); // Close the dialog
          setIncome({...income,name: "",amount: 0,});
      } 
      
      else {
        toast({
          description: "Failed to create an Income Source",
        });
      }


    } 
    
    catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error}`,
      });
    } 
    
    finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div
            onClick={() => setIsDialogOpen(true)}
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
                  <h2 className="text-black font-medium my-1">Monthly Amount</h2>
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
            <Button
              disabled={income.amount === 0 || income.name === "" || submitting}
              className="mt-5 w-full rounded-full"
              onClick={onCreateIncomes}
            >
              {submitting ? 'Submitting' : "Create Income"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateIncomes;