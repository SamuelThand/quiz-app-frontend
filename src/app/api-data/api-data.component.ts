import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin.model';
import { BackendService } from '../services/backend.service';
import { Question } from '../models/question.model';
import { Quiz } from '../models/quiz.model';
import { Subject } from '../models/subject.model';

@Component({
  selector: 'app-api-data',
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.css']
})
export class ApiDataComponent implements OnInit {
  backendService: BackendService;
  json: string = '';

  ngOnInit(): void {
    this.getAllDatabaseJSON();
  }

  constructor(backendService: BackendService) {
    this.backendService = backendService;
  }

  private getAllDatabaseJSON(): void {
    let dataString: string = '';

    this.backendService.getAdmins().subscribe((admins: Admin[]) => {
      dataString = 'Admins: ' + JSON.stringify(admins, null, 2);

      this.backendService.getQuestions().subscribe((questions: Question[]) => {
        dataString =
          dataString + '\n\nQuestions: ' + JSON.stringify(questions, null, 2);

        this.backendService.getQuizzes().subscribe((quizzes: Quiz[]) => {
          dataString =
            dataString + '\n\nQuizzes: ' + JSON.stringify(quizzes, null, 2);

          this.backendService.getSubjects().subscribe((subjects: Subject[]) => {
            dataString =
              dataString + '\n\nSubjects: ' + JSON.stringify(subjects, null, 2);

            this.json = dataString;
          });
        });
      });
    });
  }
}
