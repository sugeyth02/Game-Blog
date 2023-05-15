export interface IUser {
  jwt: string;
  user: User;
}

interface User {
  id: number;
  username: string;
  [key: string]: any;
}
