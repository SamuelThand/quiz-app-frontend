import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authService: AuthService;
  private backendService: BackendService;
  private router: Router;
  private tokenStorage: TokenStorageService;
  protected form: any = {
    username: null,
    password: null
  };

  private isLoggedIn = false;
  private isLoginFailed = false;

  constructor(
    authService: AuthService,
    backendService: BackendService,
    router: Router,
    tokenStorage: TokenStorageService
  ) {
    this.authService = authService;
    this.backendService = backendService;
    this.router = router;
    this.tokenStorage = tokenStorage;
  }

  ngOnInit(): void {
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    // }
  }

  login() {
    const val = this.form;

    this.backendService.signIn('Admin1', 'Test123').subscribe((response) => {
      console.log(response);
    });

    // if (val.username && val.password) {
    //   this.backendService.signIn(val.username, val.password).subscribe({
    //     next: (data) => {
    //       this.tokenStorage.saveToken(data.accessToken);
    //       this.tokenStorage.saveAdmin(data);

    //       this.isLoginFailed = false;
    //       this.isLoggedIn = true;
    //       this.router.navigateByUrl('/admin-home');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isLoginFailed = true;
    //     }
    //   });
    // }
  }
}
