import { Admin } from '../models/admin.model';
import { BackendService } from '../services/backend.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private backendService: BackendService;
  private router: Router;
  protected isSuccessful = false;
  protected isPostFailed = false;
  protected errorMessage = '';
  protected form: Admin = {
    firstName: '',
    lastName: '',
    userName: '',
    password: ''
  };

  constructor(backendService: BackendService, router: Router) {
    this.backendService = backendService;
    this.router = router;
  }

  protected onSubmit() {
    this.submit();
  }

  // TODO: Add errorMessage, isSuccessful, isPostFailed and admin username to message if successful
  private submit() {
    this.backendService.signUp(this.form).subscribe(() => {
      this.isSuccessful = true;
    });
  }
}
