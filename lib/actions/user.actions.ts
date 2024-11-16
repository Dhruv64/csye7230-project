"use server";

import User from "../database/models/user.model";
import {handleError} from '../../src/lib/utils';
import { connectToDB } from "../database/mongoose";
import { CreateUserParams } from "../../types";



// CREATE
export async function createUser(user: CreateUserParams) {
    try {
      await connectToDB();
  
      const newUser = await User.create(user);
  
      return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
      handleError(error);
    }
  }
  
  // READ
  export async function getUserById(userId: string) {
    try {
      await connectToDB();
  
      const user = await User.findOne({ clerkId: userId });
  
      if (!user) throw new Error("User not found");
  
      return JSON.parse(JSON.stringify(user));
    } catch (error) {
      handleError(error);
    }
  }