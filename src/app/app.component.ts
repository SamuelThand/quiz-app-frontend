import { BackendService } from './services/backend.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sath2102_project_frontend_dt190g';
  private backendService: BackendService;

  constructor(backendService: BackendService) {
    this.backendService = backendService;
  }

  /**
   * Get the current admin status.
   *
   * @returns true if the user is logged in as admin, false otherwise
   */
  protected isAdmin(): boolean {
    return this.backendService.isAdmin;
  }

  /**
   * Logs out the user.
   */
  protected onLogout(): void {
    this.backendService.signOut().subscribe(() => {
      this.backendService.isAdmin = false;
    });
  }
}
