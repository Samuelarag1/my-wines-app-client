import { IMUser } from "../../models/IMUser";

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string) => {
  return regexEmail.test(email);
};

export const validateRegister = (user: IMUser) => {
  if (user.password === user.confirmPassword) {
    return true;
  }
};
