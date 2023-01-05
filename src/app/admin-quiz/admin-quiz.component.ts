import { Component, Input, OnInit, Query } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  newQuizName: string = '';
  newQuizDifficulty: number = 1;
  @Input() searchString: string = '';
  private backendService: BackendService;
  activatedRoute: ActivatedRoute;
  isEditMode: boolean = false;
  idOfQuizBeingEdited: string = '';

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.isEditMode = data['isEditMode'];
    });

    // TODO REFAKTORERA!!!!!!!! AAAAAAAAAHHHHH!!!!!!!!!!!!!!!!!!!!!!!!!!1
    if (this.isEditMode === true) {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.backendService.getQuiz(params['id']).subscribe((quiz: Quiz) => {
          if (quiz._id !== undefined) {
            this.idOfQuizBeingEdited = quiz._id;
          }
          this.newQuizQuestions = quiz.questions;
          this.backendService
            .getQuestions()
            .subscribe((questions: Question[]) => {
              this.availableQuestions = questions.filter((question) => {
                return !this.newQuizQuestions.some(
                  (newQuizQuestion) => newQuizQuestion._id === question._id
                );
              });
            });
        });
      });
    } else {
      this.backendService.getQuestions().subscribe((questions: Question[]) => {
        this.availableQuestions = questions;
      });
    }
  }

  constructor(private route: ActivatedRoute, backendService: BackendService) {
    this.backendService = backendService;
    this.activatedRoute = route;
  }

  protected searchStringMatch(content: string): Boolean {
    return content.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1;
  }

  protected onQuestionAdd(clickedQuestion: Question) {
    const clickedQuestionIndex = this.availableQuestions.findIndex(
      (question) => question === clickedQuestion
    );

    this.moveQuestionToNewQuizQuestions(clickedQuestionIndex);
  }

  private moveQuestionToNewQuizQuestions(questionIndex: number) {
    this.newQuizQuestions.push(
      this.availableQuestions.splice(questionIndex, 1)[0]
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
    if (this.isEditMode) {
      //TODO id of quiz being edited
      this.backendService
        .updateQuiz(this.idOfQuizBeingEdited, this.createQuiz())
        .subscribe((quiz: Quiz) => {
          console.log('Done');
        });
    } else {
      this.backendService.addQuiz(this.createQuiz()).subscribe((quiz: Quiz) => {
        console.log('Done');
      });
    }
  }

  createQuiz(): Quiz {
    if (this.newQuizQuestions.length === 0) {
      throw new Error('No questions have been selected.');
    } else
      return {
        creator: '63af18d1fb461af8dc235cc6',
        name: this.newQuizName,
        questions: this.newQuizQuestions.flatMap(
          (question) => (question._id ? [question._id] : []) // Filters out any undefined _id
        ),
        level: this.newQuizDifficulty,
        date: new Date()
      };
  }
}
