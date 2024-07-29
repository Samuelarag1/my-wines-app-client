export interface IMUser {
  id?: number;
  name: string;
  age: string;
  email: string;
  image: string;
  password: string;
  confirmPassword?: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}
