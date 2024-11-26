import { connectToDB } from "../database/mongoose";
import { ExpenseParams } from "../../types";
import Expense from "../database/models/expense.model";


/**
 * Creates a new expense in the database.
 * @param {ExpenseParams} expense - The expense details.
 * @returns {Promise<Object>} - The created expense.
 * @throws Will throw an error if expense creation fails.
 */
export const createExpense = async (expense: ExpenseParams): Promise<object> => {
    try {
      await connectToDB();
      const newExpense = new Expense(expense);
      const savedExpense = await newExpense.save();
      return savedExpense;
    } catch (error) {
      throw new Error("Failed to create Expense");
    }
  };
  
  /**
   * Fetches all expenses for a specific user.
   * @param {string} id - The ID of the user.
   * @returns {Promise<Array<Object>>} - A list of expenses.
   */
  export const getAllExpenses = async (id: string): Promise<Array<object>> => {
    await connectToDB();
    const expenses = await Expense.find({ createdBy: id });
    return expenses;
  };
  