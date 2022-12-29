import { RouterModule, Routes } from '@angular/router';
import { ApiDataComponent } from './api-data/api-data.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'api-data', component: ApiDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
