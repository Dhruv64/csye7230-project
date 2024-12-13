import React from 'react'
import { IncomeParams } from '../../../../../../types'



const IncomeItem = ({income} :{income: IncomeParams}) => {
  return (
    <div
    className="p-5 border rounded-2xl 
        hover:shadow-md cursor-pointer 
        h-[170px] flex flex-col justify-center items-center"
    >
    <div className="flex gap-2 items-center justify-between w-full">
        <div className="flex gap-2 items-center">
        <h2
            className="text-2xl p-3 px-4
            bg-slate-100 rounded-full"
        >
            {income?.icon}
        </h2>
        <div>
            <h2 className="font-bold">{income.name}</h2>
        </div>
        </div>
        <h2 className="font-bold text-primary text-lg">
        ${income.amount}
        </h2>
    </div>
    </div>

  )
}

export default IncomeItem