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
  protected form: any = {
    username: null,
    password: null
  };

  constructor(backendService: BackendService, router: Router) {
    this.backendService = backendService;
    this.router = router;
  }

  /**
   * Logs in the user.
   */
  login() {
    const username = this.form.username;
    const password = this.form.password;

    if (username && password) {
      this.backendService.signIn(username, password).subscribe(() => {
        this.backendService.isAdmin = true;
        this.router.navigateByUrl('/admin-home');
      });
    }
  }
}
