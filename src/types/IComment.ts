export interface IComment {
  id: number;
  body: string;
  created_at: string;
  user: User;
  [key: string]: any;
}

interface User {
  username: string;
  [key: string]: any;
}
