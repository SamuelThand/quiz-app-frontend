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

  private submit() {
    this.backendService.signUp(this.form).subscribe(
      () => {
        this.isSuccessful = true;
        this.router.navigateByUrl('/');
      },
      () => {
        this.isPostFailed = true;
      }
    );
  }
}
