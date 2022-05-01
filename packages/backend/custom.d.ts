interface user {
  name: string;
  accessTypes: string[];
}

declare namespace Express {
  export interface Request {
    user?: user;
  }
}
