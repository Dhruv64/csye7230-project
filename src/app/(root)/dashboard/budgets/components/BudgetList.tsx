'use client';

import React, { useEffect, useState } from "react";
import CreateBudgets from "./CreateBudgets";
import { useUser } from "@clerk/nextjs";
import BudgetItem from './BudgetItem';
import { BudgetParams } from "../../../../../../types";

const BudgetList = () => {
  const { user } = useUser();
  const [userId, setUserId] = useState<string>('');
  const [budgetList, setBudgetList] = useState<Array<BudgetParams>>([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch the user ID
        if (user?.id) {
          const userResponse = await fetch(/api/user/${user.id});
          if (userResponse.ok) {
            const userData = await userResponse.json();
            const id = userData?._id;
            setUserId(id);

            // Step 2: Fetch budgets using the user ID
            const budgetResponse = await fetch(/api/budget/allBudgets/${id});
            if (budgetResponse.ok) {
              const budgetData = await budgetResponse.json();
              setBudgetList(budgetData); // Assuming budgetData is an array of budgets.
            }
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [user]);


  const addNewBudget = (newBudget: BudgetParams) => {
    setBudgetList((prev) => [...prev, newBudget]);
  };


  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {userId && <CreateBudgets id={userId} onAddBudget={addNewBudget} />}
        {budgetList.length > 0 ? budgetList.map((item, index) => <BudgetItem key={index} budget={item} />) : [1, 2, 3, 4, 5].map((item, index) => (
          <div
            key={index}
            className="w-full bg-slate-200 rounded-lg h-[170px] animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default BudgetList;