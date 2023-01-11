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
   * Check if there is an active logged in session. Executes a passed callback if response
   * is successful, another if the response is an error.
   */
  authCheck(successCallback: Function, errorCallback: Function) {
    this.backendService.isLoggedin().subscribe({
      next: () => successCallback(),
      error: () => errorCallback()
    });
  }
}
