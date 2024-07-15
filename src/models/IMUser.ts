export interface IMUser {
  name: string | undefined;
  age: number | undefined;
  email: string | undefined;
  image: string | undefined;
  password: string | undefined;
  confirmPassword?: string | undefined;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}
