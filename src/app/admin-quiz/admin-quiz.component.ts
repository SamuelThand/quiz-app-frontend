import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-admin-quiz',
  templateUrl: './admin-quiz.component.html',
  styleUrls: ['./admin-quiz.component.css']
})
export class AdminQuizComponent implements OnInit {
  availableQuestions: Question[] = [];
  newQuizQuestions: Question[] = [];
  private backendService: BackendService;

  ngOnInit(): void {
    this.backendService.getQuestions().subscribe((questions: Question[]) => {
      this.availableQuestions = questions;
    });
  }

  constructor(backendService: BackendService) {
    this.backendService = backendService;
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
}
