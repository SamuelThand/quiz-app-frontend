import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Quiz } from '../models/quiz.model';
import { AuthService } from '../services/auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  protected quizzes: Quiz[] = [];
  private activatedRoute: ActivatedRoute;
  private backendService: BackendService;
  private router: Router;
  private authService: AuthService;
  protected isAdmin: boolean = false;

  constructor(
    activatedRoute: ActivatedRoute,
    backendService: BackendService,
    router: Router,
    authService: AuthService
  ) {
    this.activatedRoute = activatedRoute;
    this.backendService = backendService;
    this.router = router;
    this.authService = authService;

    // backendService.isLoggedin().subscribe((response) => dosomething(response));
  }

  // dosomething(response: HttpResponse<Object>) {
  //   console.log(response.status);
  // }

  ngOnInit(): void {
    // this.backendService
    //   .isLoggedin()
    //   .subscribe((response: HttpResponse<Object>) =>
    //     this.authService.dosomething(response)
    //   );

    this.backendService
      .isLoggedin()
      .subscribe((response: HttpResponse<Object>) => {
        if (response.status === 200) {
          // router.navigateByUrl(route);
        } else {
          this.router.navigateByUrl('/');
          console.log('kuk');
        }
      });

    this.determineEditMode();

    this.initQuizzes();
  }

  /**
   * Determines if the component should be run as admin or not.
   */
  private determineEditMode() {
    this.activatedRoute.data.subscribe((data) => {
      this.isAdmin = data['isAdmin'];
    });
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
