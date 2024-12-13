import { connectToDB } from "../database/mongoose";
import Income from "../database/models/income.model";
import { IncomeParams } from "../../types";




/**
 * Creates a new income in the database.
 * @param {IncomeParams} incomeData - The income data to create.
 * @returns {Promise<Object>} - The created income document.
 * @throws {Error} - If the income creation fails.
 */
export const createIncome = async (incomeData: IncomeParams): Promise<object> => {
    await connectToDB();
    const newIncome = new Income(incomeData);
    await newIncome.save();
    return newIncome;
  };
  




/**
 * Gets an arrya of  income in the database.
 * @param userId - The userId to fetch data to get all incomse.
 * @returns {Promise<Object>} - The created income document.
 * @throws {Error} - If the income fetch fails.
 */
export const getAllIncomes = async (userId : string) : Promise<Array<object>> => {
    await connectToDB();
    const incomes = await Income.find({ createdBy : userId });
    return incomes;
}