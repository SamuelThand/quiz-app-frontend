import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  // login(username: string, password: string) {

  // }
}