import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { DatePipe } from '@angular/common';
import { Quiz } from '../models/quiz.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  quizzes: Quiz[] = [];
  private backendService: BackendService;

  ngOnInit(): void {
    this.backendService.getQuizzes().subscribe((quizzes: Quiz[]) => {
      this.quizzes = quizzes;
    });
  }

  constructor(backendService: BackendService) {
    this.backendService = backendService;
  }

  getAdminName(creator: any): string {
    return creator
      ? creator.userName + ' - ' + creator.firstName + ' ' + creator.lastName
      : 'N/A';
  }
}
