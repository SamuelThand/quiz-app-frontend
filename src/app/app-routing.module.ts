import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminQuestionComponent } from './admin-question/admin-question.component';
import { AdminQuizComponent } from './admin-quiz/admin-quiz.component';
import { ApiDataComponent } from './api-data/api-data.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'api-data', component: ApiDataComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'admin-quiz', component: AdminQuizComponent },
  { path: 'admin-question', component: AdminQuestionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
