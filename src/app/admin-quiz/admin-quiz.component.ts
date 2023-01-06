import { Component, Input, OnInit } from '@angular/core';
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
  protected availableQuestions: Question[] = [];
  protected quizQuestions: Question[] = [];
  protected quizName: string = '';
  protected quizDifficulty: number = 0;
  @Input() searchString: string = '';
  private activatedRoute: ActivatedRoute;
  protected isEditMode: boolean = false;
  private idOfQuizBeingEdited: string = '';
  protected quizRecentlySubmitted: boolean = false;

  constructor(private route: ActivatedRoute, backendService: BackendService) {
    this.backendService = backendService;
    this.activatedRoute = route;
  }

  ngOnInit(): void {
    this.determineEditMode();

    if (this.isEditMode === true) {
      this.initEditMode();
    } else {
      this.initNewQuiz();
    }
  }

  /**
   * Determines if the component should be run in edit mode or not.
   */
  private determineEditMode() {
    this.activatedRoute.data.subscribe((data) => {
      this.isEditMode = data['isEditMode'];
    });
  }

  /**
   * Loads the questions for the question being edited, and the questions that should be available
   * using the BackendService.
   */
  private initEditMode() {
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
  }

  /**
   * Initalizes the availableQuestions member using the BackendService.
   */
  private initNewQuiz() {
    this.backendService.getQuestions().subscribe((questions: Question[]) => {
      this.availableQuestions = questions;
    });
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
    this.quizQuestions = quiz.questions;
    this.quizName = quiz.name;
    this.quizDifficulty = quiz.level || 0;
  }

  /**
   * Filters out questions that are already in the quiz from the list of available questions.
   *
   * @param questions questions to filter
   */
  private filterAvailableQuestions(questions: Question[]) {
    this.availableQuestions = questions.filter((question) => {
      return !this.quizQuestions.some(
        (newQuizQuestion) => newQuizQuestion._id === question._id
      );
    });
  }

  /**
   * Determines if the searchString member matches the content parameter.
   *
   * @param content Content passed from the html-template
   * @returns There was a match
   */
  protected searchStringMatch(content: string): Boolean {
    return content.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1;
  }

  /**
   * Handler for the question add button.
   *
   * @param clickedQuestion The question on which the add button was pressed
   */
  protected onQuestionAdd(clickedQuestion: Question) {
    this.moveQuestionBetweenArrays(
      this.findClickedQuestionIndex(clickedQuestion, this.availableQuestions),
      this.availableQuestions,
      this.quizQuestions
    );
  }

  /**
   * Handler for the question remove button.
   *
   * @param clickedQuizQuestion The quiz question that was clicked.
   */
  protected onQuizQuestionRemove(clickedQuizQuestion: Question) {
    this.moveQuestionBetweenArrays(
      this.findClickedQuestionIndex(clickedQuizQuestion, this.quizQuestions),
      this.quizQuestions,
      this.availableQuestions
    );
  }

  /**
   * Finds the index of the clicked question in a Question[].
   *
   * @param clickedQuestion The clicked question
   * @param arrayToSearch The Question[] to search
   * @returns The index of the clicked question
   */
  private findClickedQuestionIndex(
    clickedQuestion: Question,
    arrayToSearch: Question[]
  ): number {
    return arrayToSearch.findIndex((question) => question === clickedQuestion);
  }

  /**
   * Moves the clicked question from one Question[] to another.
   *
   * @param questionIndex The index of the question to move
   * @param arrayToMoveFrom The Question[] to move the Question from
   * @param arrayToMoveTo The Question[] to move the Question to
   */
  private moveQuestionBetweenArrays(
    questionIndex: number,
    arrayToMoveFrom: Question[],
    arrayToMoveTo: Question[]
  ) {
    arrayToMoveTo.push(arrayToMoveFrom.splice(questionIndex, 1)[0]);
  }

  /**
   * Handler for the quiz create button.
   */
  protected onQuizCreate() {
    if (this.isEditMode) {
      // TODO Possibly take another approach if "quiz" shouldn't be used. Validate the update to the user in "Edit", close the "new quiz" or something.
      this.updateQuiz();
    } else {
      this.addQuiz();
    }
  }

  /**
   * Updates the quiz being edited using the BackendService.
   */
  private updateQuiz() {
    this.backendService
      .updateQuiz(this.idOfQuizBeingEdited, this.createQuiz())
      .subscribe((quiz: Quiz) => {
        this.quizSubmitted();
        console.log(quiz);
      });
  }

  /**
   * Adds the new quiz using the BackendService.
   */
  private addQuiz() {
    this.backendService.addQuiz(this.createQuiz()).subscribe((quiz: Quiz) => {
      console.log(quiz);
      this.quizSubmitted();
    });
  }

  /**
   * Temporarly sets quizRecentlySubmitted to false, then to true.
   */
  private quizSubmitted() {
    this.quizRecentlySubmitted = true;
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      this.quizRecentlySubmitted = false;
    }, 5000);
  }

  /**
   * Creates a new Quiz object with data from the admin-quiz component
   *
   * @returns the new Quiz object
   */
  createQuiz(): Quiz {
    if (this.quizQuestions.length === 0) {
      throw new Error('No questions have been selected.');
    } else
      return {
        creator: '63af18d1fb461af8dc235cc6',
        name: this.quizName,
        questions: this.quizQuestions.flatMap(
          (question) => (question._id ? [question._id] : []) // Filters out any undefined _id
        ),
        level: this.quizDifficulty,
        date: new Date()
      };
  }
}
