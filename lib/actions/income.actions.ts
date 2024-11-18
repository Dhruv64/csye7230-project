import { connectToDB } from "../database/mongoose";
import Income from "../database/models/income.model";
import { IncomeParams } from "../../types";

export const createIncome = async (incomeData : IncomeParams) => {
    await connectToDB();
    const newIncome = new Income(incomeData);
    newIncome.save();
    return newIncome;
}