
'use client';

import React, { useEffect, useState } from "react";
import CreateIncomes from "./CreateIncomes";
import { useUser } from "@clerk/nextjs";

const IncomeList = () => {
  const { user } = useUser();
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/${user?.id}`);
        if (response.ok) {
          const data = await response.json();
          setUserId(data?._id);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {userId && <CreateIncomes id={userId} />}
        {[1, 2, 3, 4, 5].map((item, index) => (
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