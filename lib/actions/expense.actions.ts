import { connectToDB } from "../database/mongoose";
import { ExpenseParams } from "../../types";
import Expense from "../database/models/expense.model";
import  Budget  from '../database/models/budget.model';


/**
 * Creates a new expense in the database.
 * @param {ExpenseParams} expense - The expense details.
 * @returns {Promise<Object>} - The created expense.
 * @throws Will throw an error if expense creation fails.
 */
export const createExpense = async (expense: ExpenseParams): Promise<object> => {
      await connectToDB();
      const newExpense = new Expense(expense);
      const savedExpense = await newExpense.save();

      //Update the total expense and total items in the budget
      const updatedBudget = await Budget.findByIdAndUpdate(expense.budgetId, { 
        $inc: {
          totalExpense: expense.amount,
          totalItems: 1
        },
      }, { new: true });


      if (!updatedBudget) {
        throw new Error("Failed to update the budget. Budget not found.");
      }

      
      return savedExpense;
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
  


  /**
   * Fetches the last five expenses for a specific user.
   * @param {string} id - The ID of the user.
   * @returns {Promise<Array<Object>>} - A list of expenses.
   * @throws Will throw an error if the expense fetch fails.
   */
  export const getLastFiveExpenses = async (id: string): Promise<Array<object>> => {
    await connectToDB();
    const expenses = await Expense.find({ createdBy: id }).sort({ createdAt: -1 }).limit(5);
    return expenses;
  }


/**
 * Fetches and deletes a specific expense by ID.
 * @param {string} id - The ID of the expense.
 * @returns {Promise<Object>} - The expense.
 * @throws Will throw an error if the expense is not found.
 * @throws Will throw an error if the expense fetch fails.
 */

export const deleteExpense = async (id: string): Promise<object> => {
  await connectToDB();
  
  // Fetch the expense to get the amount
  const expense = await Expense.findById(id);
  if (!expense) {
    throw new Error("Failed to delete the expense. Expense not found.");
  }

  // Delete the expense
  const deletedExpense = await Expense.findByIdAndDelete(id);

  // Decrement the budget by the expense amount
  await Budget.findByIdAndUpdate(expense.budgetId, {
    $inc: { 
      totalExpense: -expense.amount,
      totalItems: -1
     }
  });

  return deletedExpense;
}




/**
 * Fetches all expenses for a specific budget.
 * @param {string} id - The ID of the budget.
 * @returns {Promise<Object>} - A list of expenses.
 * @throws Will throw an error if the budget is not found.
 * @throws Will throw an error if the expense fetch fails.
 */ 

export const getExpenseByBudgetId = async (id: string): Promise<object> => {
  await connectToDB();
  const budget = await Expense.find({ budgetId: id });
  return budget;
}