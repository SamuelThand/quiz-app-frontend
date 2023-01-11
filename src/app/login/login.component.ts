import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private backendService: BackendService;
  private router: Router;
  protected isPostFailed = false;
  private authService: AuthService;
  protected form: any = {
    username: null,
    password: null
  };

  constructor(
    backendService: BackendService,
    router: Router,
    authService: AuthService
  ) {
    this.backendService = backendService;
    this.router = router;
    this.authService = authService;
    authService.authCheck(
      () => {
        router.navigateByUrl('/admin-home');
      },
      () => {}
    );
  }

  /**
   * Logs in the user.
   */
  login() {
    const username = this.form.username;
    const password = this.form.password;

    if (username && password) {
      this.backendService.signIn(username, password).subscribe({
        next: () => this.router.navigateByUrl('/admin-home'),
        error: () => {
          this.isPostFailed = true;
        }
      });
    }
  }
}
