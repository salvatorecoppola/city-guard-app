import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { User, UserSignUp } from '../models/userSignup';
import { userComments } from '../models/comments';
import { TokenInterceptorService } from '../components/token/token-interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  persona: any;

  constructor(
    private httpBackend: HttpBackend,
    private http: HttpClient,
    public token: TokenInterceptorService
  ) {}

  url = 'https://gorest.co.in/public/v2/users';

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  signUp(body: {}) {
    const url = 'https://gorest.co.in/public/v2/users';

    return this.http.post(url, body);
  }

  userDataAfterSignup() {
    const url = `https://gorest.co.in/public/v2/users`;

    return this.http.get(url);
  }
}
