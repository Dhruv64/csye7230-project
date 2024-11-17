import { connectToDB } from "../database/mongoose";
import  Budget  from '../database/models/budget.model';
import { BudgetParams } from "../../types";

export const createBudget = async (budget : BudgetParams) =>{

    await connectToDB();
    const newBudget = new Budget(budget);
    newBudget.save();
    return newBudget
}


export const getAllBudgets = async(id : string) =>{
    await connectToDB();
    const budgets = await Budget.find({createdBy:id});
    return budgets;

}