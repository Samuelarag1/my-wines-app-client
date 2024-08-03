import { IMUser } from "./IMUser";
export interface IMWines {
  id?: number;
  name: string;
  type: string;
  year: string;
  grape: string;
  description: string;
  price: string;
  image: string | File;
  userId?: IMUser | string | number;
  fileId?: number;
}
