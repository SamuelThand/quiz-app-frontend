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

  /**
   * Get the description of a creator object in the format "username - firstname lastname".
   * If the creator object is undefined, return "N/A" instead.
   *
   * @param creator creator object from the quiz
   * @returns description of the creator
   */
  getCreatorDescription(creator: any): string {
    return creator
      ? creator.userName + ' - ' + creator.firstName + ' ' + creator.lastName
      : 'N/A';
  }
}
