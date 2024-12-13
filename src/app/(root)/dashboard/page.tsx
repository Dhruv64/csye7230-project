'use client';
import React from 'react';

import { useEffect,useState } from "react";
import {useUser } from "@clerk/nextjs";
import ExpenseListTable from './expenses/components/ExpenseListTable';
import BarChartDashboard from '../../components/BarChartDashboard';
import CardInfo from '../../components/CardInfo';
import BudgetItem from './budgets/components/BudgetItem';


import { ExpenseParams,BudgetParams,IncomeParams } from "../../../../types";




const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [expensesList, setExpensesList] = useState<ExpenseParams[]>([]);
  const [budgetList, setBudgetList] = useState<BudgetParams[]>([]);
  const [incomeList, setIncomeList] = useState<BudgetParams[]>([]);

  useEffect(()=> {
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
            const expenseResponse = await fetch(`/api/expense/${id}`);
            if (expenseResponse.ok) {
              const expenseData = await expenseResponse.json();
              setExpensesList(expenseData); // Assuming `expenseBudget` is an array of expenses.
            }

            // Step 3: Fetch budgets using the user ID
            const budgetResponse = await fetch(`/api/budget/allBudgets/${id}`);
            if (budgetResponse.ok) {
              const budgetData = await budgetResponse.json();
              setBudgetList(budgetData); // Assuming `expenseBudget` is an array of expenses.
            }

            const incomeResponse = await fetch(`/api/income/getIncomes/${id}`);
            if (incomeResponse.ok) {
              const incomeData = await incomeResponse.json();
              setIncomeList(incomeData); // Assuming `expenseBudget` is an array of expenses.
            }
          }
        } 
      } catch (err) {
        console.error("Error fetching data:", err);
      }
  }
  fetchData();
}, [user]);




  if (!isLoaded || !isSignedIn) {
    return <div className="text-2xl font-bold">Loading...</div>;
  }

  return (
    <div className="p-8 bg-">
    <h2 className="font-bold text-4xl">Hi, {user?.fullName} 👋</h2>
    <p className="text-gray-500">
      Here's what happening with your money, Lets Manage your expense
    </p>

    <CardInfo budgetList={budgetList} incomeList={incomeList} />
    <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
      <div className="lg:col-span-2">
        <BarChartDashboard budgetList={budgetList} />

        <ExpenseListTable
          expensesList={expensesList}   
        />
      </div>
      <div className="grid gap-5">
        <h2 className="font-bold text-lg">Latest Budgets</h2>
        {budgetList?.length > 0 ? (
            budgetList.slice(-3).map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))
          ) : (
            [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[180px] w-full bg-slate-200 rounded-lg animate-pulse"
              ></div>
            ))
          )}
      </div>
    </div>
  </div>
  );
}

export default Dashboard