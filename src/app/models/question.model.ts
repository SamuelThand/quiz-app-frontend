export interface Question {
  _id?: number;
  creator: string;
  name: string;
  question: string;
  option1: string;
  optionX: string;
  option2: string;
  correctOption: string;
  date?: Date;
  level: number;
  subject: string;
  language: string;
}
