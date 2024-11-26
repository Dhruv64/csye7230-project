"use server";

import User from "../database/models/user.model";
import {handleError} from '../../src/lib/utils';
import { connectToDB } from "../database/mongoose";
import { CreateUserParams } from "../../types";



/**
 * Creates a new user in the database.
 * @param {CreateUserParams} user - The user details to create.
 * @returns {Promise<Object | undefined>} - The created user.
 */
export async function createUser(user: CreateUserParams): Promise<object | undefined> {
  try {
    await connectToDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

/**
 * Fetches a user by their Clerk ID.
 * @param {string} userId - The Clerk ID of the user.
 * @returns {Promise<Object|null>} - The user object, or null if not found.
 * @throws Will throw an error if the user is not found.
 */
export async function getUserById(userId: string): Promise<object | undefined> {
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}
