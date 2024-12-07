
import mongoose, {Mongoose} from "mongoose";

declare type MongooseConnection =  {
    conn : Mongoose | null ;
    promise : Promise <Mongoose> | null ;
}



declare type CreateUserParams = {
    clerkId: string;
    email: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    image: string;
}

declare type BudgetParams = {
    _id?: string;
    name: string;
    amount: number;
    totalExpense?: number;
    totalItems?: number;
    icon: string;
    createdBy: string;
    createdAt?: Date;
}

declare type IncomeParams = {
    name : string;
    amount : number;
    icon : string;
    createdBy : string;
}


declare type ExpenseParams = {
    _id?: string;
    name : string;
    amount : number;
    budgetId : string;
    createdBy : string;
    createdAt ?: string;
}
