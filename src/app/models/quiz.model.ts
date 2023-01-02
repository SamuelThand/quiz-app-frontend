export interface Quiz {
  _id: number;
  creator: string;
  name: string;
  questions: string[];
  level: number;
  date: Date;
}
