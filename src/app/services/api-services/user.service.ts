import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { TokenInterceptorService } from '../../components/token/token-interceptor.service';
import { User, User3, UserSignUp } from '../../models/userSignup';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
  returnUser() {
    const newHttpClient = new HttpClient(this.httpBackend);
    return newHttpClient.get(
      'https://gorest.co.in/public/v2/users?page=1&per_page=100'
    );
  }

  returnUser2(id: number) {
    const url = `https://gorest.co.in/public/v2/users`;

    return this.http.get(url);
  }
  returnUser3(id: number) {
    const url = `https://gorest.co.in/public/v2/users/${id}`;

    return this.http.get(url);
  }

  deleteUser(id: number) {
    const url = `https://gorest.co.in/public/v2/users/${id}`;
    console.log(url);

    return this.http.delete(url).pipe(
      tap((response: any) => {
        this.GetAll;
        this._refreshrequired.next();
      })
    );
  }
  deletePersonalUser(id: number) {
    const url = `https://gorest.co.in/public/v2/users/${id}`;
    console.log(url);

    return this.http.delete(url).pipe(
      tap((response: any) => {
        this.GetAll;
        this._refreshrequired.next();
      })
    );
  }

  patchUser(user: User) {
    const url = `https://gorest.co.in/public/v2/users/${user.id}`;

    return this.http.patch<User>(url, user);
  }
  GetAll(): Observable<User3[]> {
    const url = `https://gorest.co.in/public/v2/users?page=1&per_page=100 `;

    return this.http.get<User3[]>(url);
  }
}
