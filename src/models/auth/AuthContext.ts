import { IMUser } from "./../IMUser";
export default interface IMAuthContext {
  user: IMUser | null;
  login: (userData: IMUser) => void;
  logout: () => void;
}
