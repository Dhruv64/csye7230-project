"use client"

import React, { useEffect, useState } from 'react'
import ExpenseListTable from './components/ExpenseListTable';
import { useUser } from '@clerk/nextjs';
import { ExpenseParams } from '../../../../../types';

function ExpensesScreen() {

  const [expensesList,setExpensesList]=useState<ExpenseParams[]>([]);
  const {user}=useUser();

  useEffect(()=>{
      const fetchData = async () => {
        try {
          // Step 1: Fetch the user ID
          if (user?.id) {
            const userResponse = await fetch(`/api/user/${user.id}`);
            if (userResponse.ok) {
              const userData = await userResponse.json();
              const id = userData?._id;
              // setUserId(id);
  
              // Step 2: Fetch expenses using the user ID
              const expenseResponse = await fetch(`/api/expense/allExpenses/${id}`);
              if (expenseResponse.ok) {
                const expenseData = await expenseResponse.json();
                setExpensesList(expenseData); // Assuming `expenseBudget` is an array of expenses.
              }
            }
          }
        } catch (err) {
          console.error("Error fetching data:", err);
            }
          };
    
          fetchData();
        }, [user]);


  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl'>My Expenses</h2>

        <ExpenseListTable expensesList={expensesList} setExpensesList={setExpensesList}/>
    </div>
  )
}

export default ExpensesScreen