export interface Quiz {
  _id?: string;
  creator: string;
  name: string;
  questions: any[];
  level: number;
  date: Date;
}
