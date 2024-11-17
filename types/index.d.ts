
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
    name: string;
    amount: number;
    icon: string;
    createdBy: string;
}