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
import { BudgetParams, IncomeParams } from "../../../../../../types";

interface CreateBudgetProps {
  id: string;
  onAddBudget: (budget: BudgetParams) => void;
}

function CreateBudgets({ id,onAddBudget }: CreateBudgetProps) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [budget, setBudget] = useState<IncomeParams>({
    name: "",
    amount: 0,
    icon: "😀",
    createdBy: id
  });
  
  const { toast } = useToast()



  useEffect(() => {
    setBudget(prev => ({ ...prev, createdBy: id }));
  }, [id]);

  const onCreateIncomes = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/budget/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(budget)
      });

      if (response.ok) 
        {
          const createdBudget = await response.json();
          
          toast({
            description: "Budget created successfully",
          });

          onAddBudget(createdBudget);


          setIsDialogOpen(false); // Close the dialog
          setBudget({...budget,name: "",amount: 0,});
      } 
      
      else {
        toast({
          variant: "destructive",
          description: "Failed to create a Budget Source",
        });
      }


    } 
    
    catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: ${error},
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
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
                        setBudget({ ...budget, icon: e.emoji });
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Type of  Budget</h2>
                  <Input
                    placeholder="e.g. Food, Rent, etc"
                    onChange={(e) => setBudget({...budget, name: e.target.value})}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 5000$"
                    onChange={(e) => setBudget({...budget, amount: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              disabled={budget.amount === 0 || budget.name === "" || submitting}
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

export default CreateBudgets;