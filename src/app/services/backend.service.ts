// Import angular modules
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Import project models
import { Admin } from '../models/admin.model';
import { Question } from '../models/question.model';
import { Quiz } from '../models/quiz.model';
import { Subject } from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // TODO: Replace localhost url with azure url
  // URL to the backend
  #url: string = 'http://localhost:3000/';

  // Route endpoints
  private adminEndpoint = this.#url + 'admins/';
  private questionEndpoint = this.#url + 'questions/';
  private quizEndpoint = this.#url + 'quizzes/';
  private subjectEndpoint = this.#url + 'subjects/';
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Get an array of all existing Question objects from the backend.
   *
   * @returns Observable with an array of all existing Question objects
   */
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionEndpoint);
  }

  /**
   * Get a Question by id.
   *
   * @param id id of the question
   * @returns Observable with the Question object
   */
  getQuestion(id: number): Observable<Question> {
    return this.http.get<Question>(this.questionEndpoint + id);
  }
}
