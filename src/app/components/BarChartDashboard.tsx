import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BudgetParams } from "../../../types";

const BarChartDashboard=({ budgetList }: {budgetList : BudgetParams[]}) => {
  return (
    <div className="border rounded-2xl p-5">
      <h2 className="font-bold text-lg">Activity</h2>
      <ResponsiveContainer width={"80%"} height={300}>
        <BarChart
          data={budgetList}
          margin={{
            top: 7,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalExpense" stackId="a" fill="#408fff" />
          <Bar dataKey="amount" stackId="a" fill="#99d4ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;