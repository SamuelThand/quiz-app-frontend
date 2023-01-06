/**
 * Interface for Admin objects
 */
export interface Admin {
  _id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  date?: Date;
  age?: number;
  sex?: string;
}
