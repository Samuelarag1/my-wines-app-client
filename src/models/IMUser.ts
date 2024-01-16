export interface IMUser {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  age?: number;
  created_at?: Date;
  updated_at?: Date;
}
