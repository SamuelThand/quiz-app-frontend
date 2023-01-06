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
  private backendService: BackendService;
  availableQuestions: Question[] = [];
  // TODO: Remove "new" to emphasize that this is not only for new quizzes
  newQuizQuestions: Question[] = [];
  newQuizName: string = '';
  newQuizDifficulty: number = 0;
  @Input() searchString: string = '';
  activatedRoute: ActivatedRoute;
  isEditMode: boolean = false;
  idOfQuizBeingEdited: string = '';
  quizRecentlySubmitted: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.isEditMode = data['isEditMode'];
    });

    // TODO REFAKTORERA!!!!!!!! AAAAAAAAAHHHHH!!!!!!!!!!!!!!!!!!!!!!!!!!1
    if (this.isEditMode === true) {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.backendService.getQuiz(params['id']).subscribe((quiz: Quiz) => {
          this.extractEditQuizData(quiz);

          this.backendService
            .getQuestions()
            .subscribe((questions: Question[]) => {
              this.filterAvailableQuestions(questions);
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

  /**
   * Extracts data from quiz to be edited and sets it to the component's variables.
   *
   * @param quiz quiz to extract data from
   */
  private extractEditQuizData(quiz: Quiz) {
    if (quiz._id !== undefined) {
      this.idOfQuizBeingEdited = quiz._id;
    }
    this.newQuizQuestions = quiz.questions;
    this.newQuizName = quiz.name;
    this.newQuizDifficulty = quiz.level || 0;
  }

  /**
   * Filters out questions that are already in the quiz from the list of available questions.
   *
   * @param questions questions to filter
   */
  private filterAvailableQuestions(questions: Question[]) {
    this.availableQuestions = questions.filter((question) => {
      return !this.newQuizQuestions.some(
        (newQuizQuestion) => newQuizQuestion._id === question._id
      );
    });
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
      // Possibly take another approach if "quiz" shouldn't be used. Validate the update to the user in "Edit", close the "new quiz" or something.
      this.backendService
        .updateQuiz(this.idOfQuizBeingEdited, this.createQuiz())
        .subscribe((quiz: Quiz) => {
          this.quizSubmitted();
          console.log('Done');
        });
    } else {
      this.backendService.addQuiz(this.createQuiz()).subscribe((quiz: Quiz) => {
        this.quizSubmitted();
        console.log('Done');
      });
    }
  }

  private quizSubmitted() {
    this.quizRecentlySubmitted = true;
    setTimeout(() => {
      this.quizRecentlySubmitted = false;
    }, 5000);
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

  getName(object: any): string {
    return object ? object.name : 'N/A';
  }
}
