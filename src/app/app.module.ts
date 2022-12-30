import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ApiDataComponent } from './api-data/api-data.component';
import { RegisterComponent } from './register/register.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminQuizComponent } from './admin-quiz/admin-quiz.component';
import { AdminQuestionComponent } from './admin-question/admin-question.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, ApiDataComponent, RegisterComponent, AdminHomeComponent, AdminQuizComponent, AdminQuestionComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
