'use client';
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";


import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "../../../../../hooks/use-toast";




const  AddExpense= ({ budgetId,addExpenseToList,addExpenseToTotalAmount }: {budgetId : string; addExpenseToList: (newExpense: any) => void; addExpenseToTotalAmount: (expenseAmount: number) => void;}) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();
  /**
   * Used to Add New Expense
   */
    const addNewExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await fetch("/api/expense/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                amount,
                budgetId,
            }),
            });
        


        if (response.ok) {
          const newExpense = await response.json();
          toast({
                description: "Expense Added Successfully",
            });

          addExpenseToList(newExpense); // Update the list instantly
          addExpenseToTotalAmount(amount); // Update the total amount of the budget
          setName("");
          setAmount(0);
        }

        else {
            toast({
            variant: "destructive",
            description: "Failed to add an expense!",
            });
        }

        }


        catch (error){
            toast({
                description: `${error}`,
                variant: "destructive",
                title: "Error",

            });
        }

            finally{
                setLoading(false);
            }
};



  return (
    <div className="border p-5 rounded-2xl">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          type="number"
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={(e) => addNewExpense(e)}
        className="mt-3 w-full rounded-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;