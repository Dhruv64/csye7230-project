'use client'

import React from 'react'
import IncomeList from '../../dashboard/income/components/IncomeList';

type Props = {}

const Income = (props: Props) => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Income Streams</h2>
      <IncomeList />
    </div>
  )
}

export default Income