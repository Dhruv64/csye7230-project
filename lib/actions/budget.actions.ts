import { connectToDB } from "../database/mongoose";
import  Budget  from '../database/models/budget.model';
import { BudgetParams } from "../../types";
import { userSchema} from "../database/models/user.model";
import mongoose from "mongoose";



/**
 * Creates a new budget in the database.
 * @param {BudgetParams} budget - The budget details to create.
 * @returns {Promise<Object>} - The created budget.
 */
export const createBudget = async (budget: BudgetParams): Promise<object> => {
  await connectToDB();
  const newBudget = new Budget(budget);
  newBudget.save();
  return newBudget;
};

/**
 * Fetches all budgets for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array<Object>>} - A list of budgets.
 */
export const getAllBudgets = async (userId: string): Promise<Array<object>> => {
  await connectToDB();
  const User = mongoose.models.user || mongoose.model("user", userSchema);
  const budgets = await Budget.find({ createdBy: userId }).populate({
    path: "createdBy",
    model: User,
    select: "email",
  });
  return budgets;
};