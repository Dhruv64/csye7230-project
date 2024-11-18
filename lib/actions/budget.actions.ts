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
    mongoose.model('user', userSchema);


  
    const budgets = await Budget.find({ createdBy: userId }).populate({
        path: 'createdBy',
        model: 'user',
        select: 'email ' // Select the fields you want to include
    });
  
    return budgets;
};