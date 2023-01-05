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

  // TODO: Add backend functionality for sign in and sign up (possibly new endpoint and service "auth")

  /**
   * Sign in an Admin object in the backend.
   *
   * @param username username of the Admin
   * @param password password of the Admin
   * @returns the Admin object
   */
  signIn(username: string, password: string): Observable<Admin> {
    return this.http.post<Admin>(this.adminEndpoint + 'signin', {
      username,
      password
    });
  }

  /**
   * Create a new Admin object in the backend.
   *
   * @param admin new Admin object to be added to the backend
   * @returns new Admin object
   */
  signUp(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.adminEndpoint + 'signup', admin);
  }

  /**
   * Get an array of all existing Admin objects from the backend.
   *
   * @returns Observable with an array of all existing Admin objects
   */
  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.adminEndpoint);
  }

  /**
   * Get the Admin with the specified username.
   *
   * @param username username of the Admin
   * @returns Observable with the Admin object
   */
  getAdmin(username: string): Observable<Admin> {
    return this.http.get<Admin>(this.adminEndpoint + username);
  }

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

  addQuestion(question: {}): Observable<Question> {
    return this.http.post<Question>(this.questionEndpoint, question, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  addQuiz(quiz: {}): Observable<Quiz> {
    return this.http.post<Quiz>(this.quizEndpoint, quiz);
  }

  updateQuiz(id: string, quiz: {}): Observable<Quiz> {
    return this.http.put<Quiz>(this.quizEndpoint + id, quiz);
  }

  /* -------------------- Quiz methods -------------------- */

  /**
   * Get an array of all existing Quiz objects from the backend.
   *
   * @returns Observable with an array of all existing Quiz objects
   */
  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.quizEndpoint);
  }

  // TODO: Change this and backend to id (name is not unique, if kept, make name unique)
  /**
   * Get a Quiz by name.
   *
   * @param name name of the Quiz
   * @returns Observable with the Quiz object
   */
  getQuiz(name: string): Observable<Quiz> {
    return this.http.get<Quiz>(this.quizEndpoint + name);
  }

  /* -------------------- Subject methods -------------------- */

  /**
   * Get an array of all existing Subject objects from the backend.
   *
   * @returns Observable with an array of all existing Subject objects
   */
  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjectEndpoint);
  }

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
  getSubject(subjectCode: string): Observable<Subject> {
    return this.http.get<Subject>(this.subjectEndpoint + subjectCode);
  }
}
