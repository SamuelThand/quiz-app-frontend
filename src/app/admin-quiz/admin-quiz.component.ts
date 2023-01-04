import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Question } from '../models/question.model';
import { Quiz } from '../models/quiz.model';

@Component({
  selector: 'app-admin-quiz',
  templateUrl: './admin-quiz.component.html',
  styleUrls: ['./admin-quiz.component.css']
})
export class AdminQuizComponent implements OnInit {
  availableQuestions: Question[] = [];
  newQuizQuestions: Question[] = [];
  newQuizName: String = '';
  newQuizDifficulty: Number = 1;
  @Input() searchString: string = '';
  private backendService: BackendService;

  ngOnInit(): void {
    this.backendService.getQuestions().subscribe((questions: Question[]) => {
      this.availableQuestions = questions;
    });
  }

  constructor(backendService: BackendService) {
    this.backendService = backendService;
  }

  protected searchStringMatch(content: string): Boolean {
    return content.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1;
  }

  protected onQuestionAdd(clickedQuestion: Question) {
    const clickedQuestionIndex = this.availableQuestions.findIndex(
      (question) => question === clickedQuestion
    );

    this.newQuizQuestions.push(
      this.availableQuestions.splice(clickedQuestionIndex, 1)[0]
    );
  }

  protected onNewQuizQuestionRemove(clickedNewQuizQuestion: Question) {
    const clickedNewQuizQuestionIndex = this.newQuizQuestions.findIndex(
      (newQuizQuestion) => newQuizQuestion === clickedNewQuizQuestion
    );

    this.availableQuestions.push(
      this.newQuizQuestions.splice(clickedNewQuizQuestionIndex, 1)[0]
    );
  }

  protected onQuizCreate() {
    console.log('afaef');
  }

  //TODO input för namn och level, kolla hur _id, referenser i questions och datum
  // ska hanteras inför backend
  createQuiz(): Quiz {
    if (this.newQuizQuestions.length === 0) {
      throw new Error('No questions have been selected.');
    } else
      return {
        _id: 0,
        creator: 'admin',
        name: 'aa',
        questions: ['aa', 'aa'],
        level: 1,
        date: new Date()
      };

    // _id: number;
    // creator: string;
    // name: string;
    // questions: string[];
    // level: number;
    // date: Date;

    // creator: 'Tester',
    // name: this.name,
    // question: this.question,
    // option1: this.option1,
    // optionX: this.optionX,
    // option2: this.option2,
    // correctOption: this.correctOption,
    // level: this.difficulty,
    // subject: this.subject,
    // language: this.language
  }
}
