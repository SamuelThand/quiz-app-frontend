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
  subjects: Subject[] = [];

  form: any = {
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

  isSuccessful = false;
  isPostFailed = false;
  errorMessage = '';

  ngOnInit(): void {
    this.backendService.getSubjects().subscribe((subjects: Subject[]) => {
      this.subjects = subjects;
    });
  }

  @Output() questionAdded = new EventEmitter<Question>();

  constructor(backendService: BackendService) {
    this.backendService = backendService;
    this.questionAdded = new EventEmitter<Question>();
  }

  onSubmit(): void {
    const newQuestion = this.createQuestion();
    this.backendService.addQuestion(newQuestion).subscribe({
      next: (data) => {
        console.log(data); // TODO: Remove log
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

  createQuestion(): Question {
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
  capitalFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // TODO: Remove if not used
  validateForm(): boolean {
    return (
      this.form.name !== '' &&
      this.form.question !== '' &&
      this.form.option1 !== '' &&
      this.form.optionX !== '' &&
      this.form.option2 !== '' &&
      this.form.correctOption !== '' &&
      this.form.difficulty !== 0 &&
      this.form.subject !== '' &&
      this.form.language !== ''
    );
  }
}
