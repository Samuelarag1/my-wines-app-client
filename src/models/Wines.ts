import { IMUser } from "./IMUser";

export interface IMWines {
  id?: number;
  name: string;
  type: string;
  year: number | undefined;
  description: string;
  price: number | undefined;
  image: string;
  userId?: IMUser;
}
