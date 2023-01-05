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
  name: string = '';
  question: string = '';
  option1: string = '';
  optionX: string = '';
  option2: string = '';
  correctOption: string = '';
  difficulty: number = 0;
  subject: string = '';
  language: string = '';

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

  addQuestion(): void {
    const newQuestion = this.createQuestion();
    this.backendService
      .addQuestion(newQuestion)
      .subscribe((question: Question) => {
        this.questionAdded.emit(question);
      });
  }

  createQuestion(): Question {
    if (!this.validateForm()) {
      throw new Error('Form is not valid');
    }
    return {
      creator: '63af18d1fb461af8dc235cc6',
      name: this.name,
      question: this.question,
      option1: this.option1,
      optionX: this.optionX,
      option2: this.option2,
      correctOption: this.correctOption,
      level: this.difficulty,
      subject: this.subject,
      language: this.language
    };
  }
  capitalFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  validateForm(): boolean {
    return (
      this.name !== '' &&
      this.question !== '' &&
      this.option1 !== '' &&
      this.optionX !== '' &&
      this.option2 !== '' &&
      this.correctOption !== '' &&
      this.difficulty !== 0 &&
      this.subject !== '' &&
      this.language !== ''
    );
  }
}
