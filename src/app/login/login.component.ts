import { BackendService } from '../services/backend.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private backendService: BackendService;

  constructor(backendService: BackendService) {
    this.backendService = backendService;
  }

  login() {
    this.backendService.signIn('Admin1', 'Test123').subscribe((response) => {
      console.log(response);
    });
  }
}
