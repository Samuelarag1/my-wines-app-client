import { IMUser } from "../../models/IMUser"

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email:IMUser) =>{
  return regexEmail.test(email.email)
}

export const validateRegister = (user: IMUser) =>{
  if(user.password === user.confirmPassword){
    return true
  }
}



