import { User } from "../models";

// Common User validators
export const validateEmail = async (email: string) => {
  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser)
    throw new Error;
  return false;
};

export const validatePassword = async (password: string) => {
  if (! /[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)) {
    throw new Error;
  }
};
