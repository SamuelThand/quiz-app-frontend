export interface Quiz {
  _id?: string;
  creator: string;
  name: string;
  questions: string[];
  level: number;
  date: Date;
}
