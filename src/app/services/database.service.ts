import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { UserSignUp } from '../models/userSignup';
import { userComments } from '../models/comments';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  persona: any;
  nani = JSON.parse(localStorage.getItem('user')).id;

  url = 'https://gorest.co.in/public/v2/users';

  constructor(private http: HttpClient) {}

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
    });
    return this.http.get(this.url, { headers });
  }

  returnUser2(id: number) {
    const url = `https://gorest.co.in/public/v2/users/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
    });
    return this.http.get(url, { headers });
  }

  returnComments() {
    const url = 'https://gorest.co.in/public/v2/comments';
    return this.http.get(url);
  }
  returnStandardPosts() {
    return this.http.get('https://gorest.co.in/public/v2/posts');
  }

  createNewPost(newPost: {
    title: string;
    body: string;
  }): Observable<UserSignUp> {
    const url = `https://gorest.co.in/public/v2/users/${this.nani}/posts`;
    console.log(url);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
    });

    return this.http.post(url, newPost, { headers }).pipe(
      tap((response: any) => {
        this.GetAll();
        this.Refreshrequired.next();
      })
    );
  }

  GetAll() {
    const url = `https://gorest.co.in/public/v2/users/${this.nani}/posts`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
    });
    return this.http.get(url, { headers });
  }
  commentaPost(comment: userComments): Observable<any> {
    const url = `https://gorest.co.in/public/v2/posts/${comment.post_id}/comments`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
    });
    console.log(url);
    return this.http.post(url, comment, { headers }).pipe(
      tap((response: any) => {
        this.GetAllComments;
        this.Refreshrequired.next();
      })
    );
  }
  GetAllComments(comment: any) {
    const url = `https://gorest.co.in/public/v2/posts/${comment}/comments`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
    });
    return this.http.get(url, { headers });
  }
  GetAllComments2() {
    const url = `https://gorest.co.in/public/v2/comments`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
    });
    return this.http.get(url, { headers });
  }
  commentStandardPost(comment: userComments): Observable<any> {
    const url = `https://gorest.co.in/public/v2/posts/${comment.post_id}/comments`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
    });
    console.log(url);
    return this.http.post(url, comment, { headers }).pipe(
      tap((response: any) => {
        this.GetAllComments;
        this.Refreshrequired.next();
      })
    );
  }
}
