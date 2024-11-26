import { connectToDB } from "../database/mongoose";
import  Budget  from '../database/models/budget.model';
import { BudgetParams } from "../../types";
import { userSchema} from "../database/models/user.model";
import mongoose from "mongoose";



export const createBudget = async (budget : BudgetParams) =>{

    await connectToDB();
    const newBudget = new Budget(budget);
    newBudget.save();
    return newBudget
}


export const getAllBudgets = async (userId: string) => {
    await connectToDB();
  
    // Check if the model is already defined
    const User = mongoose.models.user || mongoose.model("user", userSchema);
  
    // Fetch budgets and populate the user details
    const budgets = await Budget.find({ createdBy: userId }).populate({
      path: "createdBy",
      model: User, 
      select: "email", 
    });
  
    return budgets;
  };