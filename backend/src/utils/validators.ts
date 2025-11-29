import { Contact, User } from "../models";

// Common User validators
export const validateEmail = async (email: string) => {
  if (await User.findOne({ where: { email: email } }))
    throw new Error;
  if (await Contact.findOne({ where: { email: email } }))
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

export const validatePhoneExist = async (phone: string) => {
  if (await Contact.findOne({ where: { phone: phone } }))
    throw new Error;
  return false;
};