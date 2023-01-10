import { BackendService } from '../services/backend.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private backendService: BackendService;
  private router: Router;
  private tokenStorage: TokenStorageService;
  protected form: any = {
    username: null,
    password: null
  };

  constructor(
    backendService: BackendService,
    router: Router,
    tokenStorage: TokenStorageService
  ) {
    this.backendService = backendService;
    this.router = router;
    this.tokenStorage = tokenStorage;
  }

  login() {
    const username = this.form.username;
    const password = this.form.password;

    if (username && password) {
      this.backendService.signIn(username, password).subscribe(() => {
        this.router.navigateByUrl('/admin-home');
      });
    }
  }
}
