import { connectToDB } from "../database/mongoose";
import Income from "../database/models/income.model";
import { IncomeParams } from "../../types";




/**
 * Creates a new income in the database.
 * @param {IncomeParams} incomeData - The income data to create.
 * @returns {Promise<Object>} - The created income document.
 * @throws {Error} - If the income creation fails.
 */
export const createIncome = async (incomeData : IncomeParams) : Promise<object> => {
    await connectToDB();
    const newIncome = new Income(incomeData);
    newIncome.save();
    return newIncome;
}