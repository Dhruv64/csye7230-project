
'use client';

import React, { useEffect, useState } from "react";
import CreateIncomes from "./CreateIncomes";
import { useUser } from "@clerk/nextjs";
import { IncomeParams } from "../../../../../../types";
import IncomeItem from './IncomeItem';

const IncomeList = () => {
  const { user } = useUser();
  const [userId, setUserId] = useState<string>('');
  const [incomeList, setIncomeList] = useState<Array<IncomeParams>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch the user ID

        const response = await fetch(`/api/user/${user?.id}`);
        if (response.ok) {
          const data = await response.json();
          setUserId(data?._id);

          // Step 2: Fetch incomes using the user ID
          const incomeResponse = await fetch(`/api/income/getIncomes/${data?._id}`);
          if (incomeResponse.ok) {
            const incomeData = await incomeResponse.json();
            setIncomeList(incomeData); 
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const addNewBudget = (newIncome: IncomeParams) => {
    setIncomeList((prev) => [...prev, newIncome]);
  };


  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {userId && <CreateIncomes id={userId} onAddIncomes={addNewBudget} />}
        {incomeList.length > 0 ? incomeList.map((item,index)=> <IncomeItem key={index} income={item}/>)  :[1, 2, 3, 4, 5].map((item, index) => (
          <div
            key={index}
            className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default IncomeList;