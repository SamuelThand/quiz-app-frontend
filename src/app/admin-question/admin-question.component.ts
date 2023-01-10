import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Question } from '../models/question.model';
import { Subject } from '../models/subject.model';

@Component({
  selector: 'app-admin-question',
  templateUrl: './admin-question.component.html',
  styleUrls: ['./admin-question.component.css']
})
export class AdminQuestionComponent implements OnInit {
  private backendService: BackendService;
  protected subjects: Subject[] = [];
  protected form: any = {
    name: null,
    question: null,
    option1: null,
    optionX: null,
    option2: null,
    correctOption: null,
    difficulty: null,
    subject: null,
    language: null
  };
  protected isSuccessful = false;
  protected isPostFailed = false;
  private errorMessage = '';
  @Output() questionAdded = new EventEmitter<Question>();

  constructor(backendService: BackendService) {
    this.backendService = backendService;
    this.questionAdded = new EventEmitter<Question>();
  }

  ngOnInit(): void {
    this.initSubjects();
  }

  /**
   * Initializes subjects member from the BackendService
   */
  private initSubjects() {
    this.backendService.getSubjects().subscribe((subjects: Subject[]) => {
      this.subjects = subjects;
    });
  }

  /**
   * Handler for the submission button.
   */
  protected onSubmit(): void {
    this.addNewQuestion();
  }

  /**
   * Uses the BackendService to add a new question.
   */
  private addNewQuestion() {
    const newQuestion = this.createQuestion();
    this.backendService.addQuestion(newQuestion).subscribe({
      next: (data) => {
        this.isSuccessful = true;
        this.isPostFailed = false;
        this.questionAdded.emit(data);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isPostFailed = true;
      }
    });
  }

  /**
   * Reads form data, and constructs a new Question from the fields.
   *
   * @returns A new Question object
   */
  private createQuestion(): Question {
    return {
      creator: '63af18d1fb461af8dc235cc6',
      name: this.form.name,
      question: this.form.question,
      option1: this.form.option1,
      optionX: this.form.optionX,
      option2: this.form.option2,
      correctOption: this.form.correctOption,
      level: this.form.difficulty,
      subject: this.form.subject,
      language: this.form.language
    };
  }

  /**
   * Capitalizes the first letter of a string.
   *
   * @param str The string to capitalize
   * @returns The string with the first letter capitalized
   */
  protected capitalFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
