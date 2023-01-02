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

  /* -------------------- Admin methods -------------------- */

  /**
   * Get an array of all existing Admin objects from the backend.
   *
   * @returns Observable with an array of all existing Admin objects
   */
  getAdmins(): Observable<Admin[]> {}

  /**
   * Get the Admin with the specified username.
   *
   * @param username username of the Admin
   * @returns Observable with the Admin object
   */
  getAdmin(username: string): Observable<Admin> {}

  /* -------------------- Question methods -------------------- */

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
   * @param id id of the Question
   * @returns Observable with the Question object
   */
  getQuestion(id: number): Observable<Question> {
    return this.http.get<Question>(this.questionEndpoint + id);
  }

  /* -------------------- Quiz methods -------------------- */

  /**
   * Get an array of all existing Quiz objects from the backend.
   *
   * @returns Observable with an array of all existing Quiz objects
   */
  getQuizzes(): Observable<Quiz[]> {}

  // TODO: Change this and backend to id (name is not unique, if kept, make name unique)
  /**
   * Get a Quiz by name.
   *
   * @param name name of the Quiz
   * @returns Observable with the Quiz object
   */
  getQuiz(name: string): Observable<Quiz> {}

  /* -------------------- Subject methods -------------------- */

  /**
   * Get an array of all existing Subject objects from the backend.
   *
   * @returns Observable with an array of all existing Subject objects
   */
  getSubjects(): Observable<Subject[]> {}

  /**
   * Get a Subject by subject code.
   * The subject code consists of 3 capitalized letters - usually the first three letters of the subject.
   *
   * Ex:
   * Economics -> ECO
   * Geography -> GEO
   *
   * @param name name of the Quiz
   * @returns Observable with the Quiz object
   */
  getSubject(subjectCode: string): Observable<Subject> {}
}
