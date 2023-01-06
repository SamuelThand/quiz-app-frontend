import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { Quiz } from '../models/quiz.model';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {
  private backendService: BackendService;
  activatedRoute: ActivatedRoute;
  quiz: Quiz | any;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param) => {
      this.backendService.getQuiz(param['id']).subscribe((quiz: Quiz) => {
        this.quiz = quiz;
      });
    });
  }

  constructor(activatedRoute: ActivatedRoute, backendService: BackendService) {
    this.activatedRoute = activatedRoute;
    this.backendService = backendService;
  }

  stringJson(quiz: Quiz): string {
    return JSON.stringify(quiz);
  }
}
