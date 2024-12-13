'use client';
import React,{useState,useEffect} from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog"
import { Button } from "../../../../../components/ui/button";
import { ArrowLeft, Pen, PenBox, Trash } from "lucide-react";
import { useUser } from "@clerk/nextjs";


import { useToast } from "../../../../../hooks/use-toast";
import { useRouter } from "next/navigation";


import BudgetItem from "../../budgets/components/BudgetItem";
import ExpenseListTable from "../components/ExpenseListTable";
import AddExpense from "../components/AddExpense";
import { ExpenseParams } from '../../../../../../types';
import { BudgetParams } from '../../../../../../types';


interface Params {
  id: string;
}

const ExpenseIdPage = ({params}: {params: Params}) => {
  const [budgetInfo, setbudgetInfo] = useState<BudgetParams>();
  const [expensesList, setExpensesList] = useState<ExpenseParams[]>([]);

  const route = useRouter();
  const {toast} = useToast();
  const {user}=useUser();



  //loading budget info
  useEffect(() => {
    const getBudgetInfo = async () => {
      try{
        const res = await fetch(`/api/budget/getBudget/${params.id}`);

        if (res.ok){
          const data = await res.json();
          setbudgetInfo(data);
          
        }

      }
      catch(err){
        console.error("Error fetching data:", err);
      }
    }

    const getExpensesList = async () =>   {      
      try {

          const expenseResponse = await fetch(`/api/expense/byBudget/${params.id}`);
          if (expenseResponse.ok) {
            const expenseData = await expenseResponse.json();
            setExpensesList(expenseData); // Assuming `expenseBudget` is an array of expenses.
          }
        
      }
     catch (err) {
        console.error("Error fetching data:", err);
        }
      };

    getBudgetInfo();
    getExpensesList();
    
  },[user,params.id]);



  //Delete Budget and all expenses

  const deleteBudget = async () => {
    try{
      const response = await fetch(`/api/budget/getBudget/${params.id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if(response.ok){
        toast({
          description: "Budget Deleted Successfully",
          title : "Success"
        })
        route.replace("/dashboard/budgets")
      }
      else{
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete a budget!"
        })
      }
    }
    catch(err){
      console.error("Error deleting budget", err)
    }
  }



  //State Management


  // Add new expense to the list
    const addExpenseToList = (newExpense: ExpenseParams) => {
      setExpensesList((prevList) => [newExpense, ...prevList]);
    };

    // Add new expense to the list
    const addExpenseToTotalAmount = (expenseAmount: Number) => {
      setbudgetInfo((prevList) => {
        if (!prevList) return prevList;
        return {
          ...prevList,
          totalExpense: (prevList.totalExpense || 0) + Number(expenseAmount),
          totalItems: (prevList.totalItems || 0) + 1,
        };
      });
    };


    // Decrease total expense amount
    const updateTotalExpense = (amount: number) => {
      setbudgetInfo((prevList) => {
        if (!prevList) return prevList;
        return {
          ...prevList,
          totalExpense: (prevList.totalExpense ?? 0) - amount,
          totalItems: (prevList.totalItems || 0) - 1,
        };
      });
    };




  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => route.back()} className="cursor-pointer" />
          My Expenses
        </span>
        <div className="flex gap-2 items-center">
          {/* <EditBudget
            budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}
          /> */}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 rounded-full" variant="destructive">
                <Trash className="w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div
        className="grid grid-cols-1 
        md:grid-cols-2 mt-6 gap-5"
      >
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div
            className="h-[150px] w-full bg-slate-200 
            rounded-lg animate-pulse"
          ></div>
        )}
        <AddExpense
          budgetId={params.id}
          addExpenseToList={addExpenseToList}
          addExpenseToTotalAmount={addExpenseToTotalAmount}
        />
      </div>
      <div className="mt-4">
        <ExpenseListTable
          expensesList={expensesList}
          setExpensesList={setExpensesList}
          updateTotalExpense={updateTotalExpense}

        />
      </div>
    </div>
  );
}

export default ExpenseIdPage