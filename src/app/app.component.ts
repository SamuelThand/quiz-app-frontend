import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BackendService } from './services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sath2102_project_frontend_dt190g';
  private backendService: BackendService;
  private authService: AuthService;
  private router: Router;
  protected displayLogoutButton: Boolean = false;

  constructor(
    backendService: BackendService,
    authService: AuthService,
    router: Router
  ) {
    this.backendService = backendService;
    this.authService = authService;
    this.router = router;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn();
      }
    });
  }

  /**
   * Checks if a user is logged in.
   */
  protected isLoggedIn(): void {
    this.authService.authCheck(
      () => {
        this.displayLogoutButton = true;
      },
      () => {
        this.displayLogoutButton = false;
      }
    );
  }

  /**
   * Logs out the user.
   */
  protected onLogout(): void {
    this.backendService.signOut().subscribe(() => {
      this.backendService.isAdmin = false;
    });
  }

  /**
   * Determines the destination of the home button.
   */
  protected onHomeButton(): void {
    this.authService.authCheck(
      () => {
        this.router.navigateByUrl('/admin-home');
      },
      () => {
        this.router.navigateByUrl('/');
      }
    );
  }
}
