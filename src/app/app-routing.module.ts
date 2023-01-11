import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminQuestionComponent } from './admin-question/admin-question.component';
import { AdminQuizComponent } from './admin-quiz/admin-quiz.component';
import { ApiDataComponent } from './api-data/api-data.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'api-data', component: ApiDataComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin-home',
    component: AdminHomeComponent
  },
  {
    path: 'guest-home',
    component: AdminHomeComponent
  },
  {
    path: 'admin-quiz-create',
    component: AdminQuizComponent,
    data: { isEditMode: false }
  },
  {
    path: 'admin-quiz-edit',
    component: AdminQuizComponent,
    data: { isEditMode: true }
  },
  { path: 'admin-question', component: AdminQuestionComponent },
  { path: 'play-quiz', component: PlayQuizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
