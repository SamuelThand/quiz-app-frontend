import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  dosomething(response: HttpResponse<Object>) {
    console.log(response.status);

    if (response.status === 200) {
      // router.navigateByUrl(route);
    } else {
      this.router.navigateByUrl('/');
      console.log('kuk')
    }
  }
}
