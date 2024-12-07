import { Trash } from "lucide-react";
import React from "react";
import { ExpenseParams } from "../../../../../../types";
import { format } from 'date-fns';
import { useToast } from "../../../../../hooks/use-toast";
import { usePathname } from "next/navigation";


interface ExpenseListTableProps {
    expensesList: ExpenseParams[];
    setExpensesList?: React.Dispatch<React.SetStateAction<ExpenseParams[]>>;
    updateTotalExpense? : (amount: number) => void;
}


const ExpenseListTable= (props: ExpenseListTableProps)=> {
  const {toast} = useToast();
  const path = usePathname();



  const deleteExpense = async (id: string) => {
    try{
      const response = await fetch(`/api/expense/${id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })


      const data = await response.json()
      if(response.ok){
        // props.setExpensesList((prevList) => prevList.filter((expense) => expense._id !== id));
        props.setExpensesList && props.setExpensesList((prevList) => prevList.filter((expense) => expense._id !== id));
        props.updateTotalExpense && props.updateTotalExpense(data.amount);

        toast({
          description: "Expense Deleted Successfully",
          title : "Success"
        })
      }
      else{
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete an expense!"
        })
      }
    }
    catch(err){
      console.error("Error deleting expense", err)
    }
  }


  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className={`grid ${path==='/dashboard/expenses' ? 'grid-cols-4' : 'grid-cols-3'} rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3`}>
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        { path === "/dashboard/expenses" &&
        <h2 className="font-bold">Action</h2>
        }
      </div>
      {props.expensesList.map((expenses, index) => (
        <div className={`grid ${path==='/dashboard/expenses' ? 'grid-cols-4' : 'grid-cols-3'} bg-slate-50 rounded-bl-xl rounded-br-xl p-2`}>
          <h2>{expenses.name}</h2>
          <h2>{expenses.amount}</h2>
          <h2>{expenses.createdAt ? format(new Date(expenses.createdAt), 'MMM-dd-yy HH:mm:ss') : 'N/A'}</h2>
          { path === "/dashboard/expenses" &&
          <h2>
            <Trash
              onClick={() => expenses._id && deleteExpense(expenses._id)}
              className="text-red-500 cursor-pointer"/>
          </h2> 
}
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;