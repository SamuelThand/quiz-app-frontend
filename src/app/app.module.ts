import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminQuestionComponent } from './admin-question/admin-question.component';
import { AdminQuizComponent } from './admin-quiz/admin-quiz.component';
import { ApiDataComponent } from './api-data/api-data.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ApiDataComponent,
    RegisterComponent,
    AdminHomeComponent,
    AdminQuizComponent,
    AdminQuestionComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
