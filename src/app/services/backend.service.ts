// Import angular modules
import { Admin } from '../models/admin.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
import { Quiz } from '../models/quiz.model';
import { Subject } from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // TODO: Replace localhost url with azure url
  #url: string =
    // 'https://sath2102-project-backend-dt190g-ht22.azurewebsites.net/'; // URL to the backend
    'http://localhost:3000/'; // URL to the backend

  // Route endpoints
  private adminEndpoint = this.#url + 'admins/';
  private questionEndpoint = this.#url + 'questions/';
  private quizEndpoint = this.#url + 'quizzes/';
  private subjectEndpoint = this.#url + 'subjects/';
  private http: HttpClient;

  // TODO: Make sure this boolean is used correctly
  public isAdmin: boolean = false;

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
  signIn(username: string, password: string) {
    return this.http.post<Admin>(
      this.adminEndpoint + 'signin',
      {
        username: username,
        password: password
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );
  }

  /**
   * Sign out from the Admin in object in the backend.
   *
   * @returns message from the backend
   */
  signOut(): Observable<any> {
    return this.http.get(this.adminEndpoint + 'signout', {
      withCredentials: true
    });
  }

  /**
   * Create a new Admin object in the backend.
   *
   * @param admin new Admin object to be added to the backend
   * @returns new Admin object
   */
  signUp(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.adminEndpoint + 'signup', admin, {
      headers: { 'Content-Type': 'application/json' }
    });
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

  /**
   * Add a question.
   *
   * @param question to be added
   * @returns Observable with the new Question object
   */
  addQuestion(question: {}): Observable<Question> {
    return this.http.post<Question>(this.questionEndpoint, question, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  /* -------------------- Quiz methods -------------------- */

  /**
   * Get an array of all existing Quiz objects from the backend.
   *
   * @returns Observable with an array of all existing Quiz objects
   */
  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.quizEndpoint, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  /**
   * Get a Quiz by id.
   *
   * @param id id of the Quiz
   * @returns Observable with the Quiz object
   */
  getQuiz(id: string): Observable<Quiz> {
    return this.http.get<Quiz>(this.quizEndpoint + id);
  }

  /**
   * Add a quiz.
   *
   * @param quiz to be added
   * @returns Observable with the new Quiz object
   */
  addQuiz(quiz: {}): Observable<Quiz> {
    return this.http.post<Quiz>(this.quizEndpoint, quiz, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  /**
   * Update a quiz by id.
   *
   * @param id of the quiz
   * @param quiz to be added
   * @returns Observable with the updated Quiz object
   */
  updateQuiz(id: string, quiz: {}): Observable<Quiz> {
    return this.http.put<Quiz>(this.quizEndpoint + id, quiz, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  /**
   * Delete a quiz by id.
   *
   * @param id of the quiz to be deleted
   * @returns Observable with the deleted Quiz object
   */
  deleteQuiz(id: string): Observable<Quiz> {
    return this.http.delete<Quiz>(this.quizEndpoint + id, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
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
