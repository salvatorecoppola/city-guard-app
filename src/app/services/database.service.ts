import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userFromSignup } from '../models/user.FromSignup.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  user: userFromSignup;
  constructor(private http: HttpClient) {}

  postData(body: {}) {
    const url = 'https://gorest.co.in/public/v2/users';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
    });

    return this.http.post(url, body, { headers });
  }

  signUp(body: {}) {
    const url = 'https://gorest.co.in/public/v2/users';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
    });

    return this.http.post(url, body, { headers });
  }

  returnUser() {
    const url = 'https://gorest.co.in/public/v2/users';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
    });

    return this.http.get(url, { headers });
  }
}
