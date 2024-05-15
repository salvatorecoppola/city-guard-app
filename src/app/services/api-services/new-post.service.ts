import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { TokenInterceptorService } from '../../components/token/token-interceptor.service';
import { UserSignUp } from '../../models/userSignup';
import { Post } from '../../models/post';

@Injectable({
  providedIn: 'root',
})
export class NewPostService {
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

  returnStandardPosts() {
    const newHttpClient = new HttpClient(this.httpBackend);
    return newHttpClient.get(
      'https://gorest.co.in/public/v2/posts?page=1&per_page=100 '
    );
  }

  createNewPost(newPost: {
    title: string;
    body: string;
  }): Observable<UserSignUp> {
    const nani = JSON.parse(localStorage.getItem('user')).id;
    const url = `https://gorest.co.in/public/v2/users/${nani}/posts`;
    console.log(url);

    return this.http.post(url, newPost).pipe(
      tap((response: any) => {
        this.GetNewPost();
        this.Refreshrequired.next();
      })
    );
  }
  GetNewPost() {
    const nani = JSON.parse(localStorage.getItem('user')).id;
    console.log(nani);
    const url = `https://gorest.co.in/public/v2/users/${nani}/posts`;

    return this.http.get(url);
  }

  GetAll() {
    const url = `https://gorest.co.in/public/v2/posts?page=1&per_page=20 `;

    return this.http.get(url);
  }

  searchPost(searchValue: string): Observable<Post[]> {
    const url = `https://gorest.co.in/public/v2/posts?title=${searchValue}`;

    return this.http.get<Post[]>(url);
  }
}
