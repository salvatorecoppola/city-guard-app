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

  returnUser() {
    const newHttpClient = new HttpClient(this.httpBackend);
    return newHttpClient.get(
      'https://gorest.co.in/public/v2/users?page=1&per_page=5'
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

  returnComments() {
    const url = 'https://gorest.co.in/public/v2/comments';
    return this.http.get(url);
  }
  returnStandardPosts() {
    const newHttpClient = new HttpClient(this.httpBackend);
    return newHttpClient.get(
      'https://gorest.co.in/public/v2/posts?page=1&per_page=20 '
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
  onDeletePost(id: number) {
    const url = `https://gorest.co.in/public/v2/posts/${id}`;
    console.log(url);

    return this.http.delete(url).pipe(
      tap((response: any) => {
        this.GetAll;
        this._refreshrequired.next();
      })
    );
  }

  GetNewPost() {
    const nani = JSON.parse(localStorage.getItem('user')).id;
    const url = `https://gorest.co.in/public/v2/users/${nani}/posts?page=1&per_page=20 `;

    return this.http.get(url);
  }
  GetAll() {
    const url = `https://gorest.co.in/public/v2/posts?page=1&per_page=20 `;

    return this.http.get(url);
  }
  commentaPost(comment: userComments): Observable<any> {
    const url = `https://gorest.co.in/public/v2/posts/${comment.post_id}/comments`;

    console.log(url);
    return this.http.post(url, comment).pipe(
      tap((response: any) => {
        this.GetAllComments;
        this.Refreshrequired.next();
      })
    );
  }
  GetAllComments(comment: any) {
    const url = `https://gorest.co.in/public/v2/posts/${comment}/comments`;

    return this.http.get(url);
  }
  GetAllComments2() {
    const url = `https://gorest.co.in/public/v2/comments`;

    return this.http.get(url);
  }
  commentStandardPost(comment: userComments): Observable<any> {
    const url = `https://gorest.co.in/public/v2/posts/${comment.post_id}/comments`;

    console.log(url);
    return this.http.post(url, comment).pipe(
      tap((response: any) => {
        this.GetAllComments;
        this.Refreshrequired.next();
      })
    );
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
  patchUser(user: User) {
    const url = `https://gorest.co.in/public/v2/users/${user.id}`;

    return this.http.patch<User>(url, user);
  }
}
