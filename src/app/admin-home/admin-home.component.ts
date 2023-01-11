import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { Quiz } from '../models/quiz.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  protected quizzes: Quiz[] = [];
  private backendService: BackendService;
  private router: Router;
  private authService: AuthService;
  protected isLoggedIn: boolean = false;

  constructor(
    backendService: BackendService,
    router: Router,
    authService: AuthService
  ) {
    this.backendService = backendService;
    this.router = router;
    this.authService = authService;

    this.authService.authCheck(
      () => {
        this.isLoggedIn = true;
      },
      () => {
        this.isLoggedIn = false;
      }
    );
  }

  ngOnInit(): void {
    this.initQuizzes();
  }

  /**
   * Initializes quizzes member from the BackendService
   */
  private initQuizzes() {
    this.backendService.getQuizzes().subscribe((quizzes: Quiz[]) => {
      this.quizzes = quizzes;
    });
  }

  /**
   * Get the description of a creator object in the format "username - firstname lastname".
   * If the creator object is undefined, return "N/A" instead.
   *
   * @param creator creator object from the quiz
   * @returns description of the creator
   */
  protected getCreatorDescription(creator: any): string {
    return creator
      ? creator.userName + ' - ' + creator.firstName + ' ' + creator.lastName
      : 'N/A';
  }

  /**
   * Handler for the quiz delete button.
   *
   * @param clickedQuiz The quiz which delete button was clicked
   */
  onQuizDelete(clickedQuiz: Quiz): void {
    this.deleteQuiz(clickedQuiz);
  }

  /**
   * Delete a quiz using the BackendService and delete it from the quizzes array.
   *
   * @param clickedQuiz The quiz to delete
   */
  private deleteQuiz(clickedQuiz: Quiz): void {
    if (clickedQuiz._id !== undefined) {
      this.backendService.deleteQuiz(clickedQuiz._id).subscribe(() => {});

      this.quizzes = this.quizzes.filter(
        (quiz: Quiz) => quiz._id !== clickedQuiz._id
      );
    }
  }

  /**
   * Handler for the quiz component.
   *
   * @param clickedQuiz The quiz component that was clicked
   */
  onStartQuiz(clickedQuiz: Quiz): void {
    this.startQuiz(clickedQuiz._id);
  }

  /**
   * Navigate to the play-quiz component with the quiz id as a query parameter.
   *
   * @param id id of the quiz to play
   */
  private startQuiz(id: any) {
    this.router.navigate(['/play-quiz'], { queryParams: { id: id } });
  }
}
