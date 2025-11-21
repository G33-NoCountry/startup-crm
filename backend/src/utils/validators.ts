import { User } from "../models";

// Common User validators
export const validateEmail = async (email: string) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
        throw new Error;
};
