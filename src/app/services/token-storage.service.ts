import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {}

  getToken(): any {
    return window.sessionStorage.getItem('token');
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  saveToken(token: any) {
    console.log(token);
  }

  saveAdmin(admin: Admin) {
    console.log(admin);
  }
}
