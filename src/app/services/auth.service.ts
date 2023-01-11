import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router: Router;
  private backendService: BackendService;

  constructor(router: Router, backendService: BackendService) {
    this.router = router;
    this.backendService = backendService;
  }

  /**
   * Check if there is an active logged in session.
   */
  authCheck() {
    this.backendService.isLoggedin().subscribe({
      next: () => {},
      error: () => this.forceRedirectToLogin()
    });
  }

  /**
   * Redirect the user to the login page
   */
  private forceRedirectToLogin() {
    this.router.navigateByUrl('/');
  }
}
