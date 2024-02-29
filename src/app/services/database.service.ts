import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userFromSignup } from '../models/user.FromSignup.model';
import { Observable, Subject, tap } from 'rxjs';
import { UserSignUp } from '../models/aa';
import { POST } from '../models/cc';
import { Comments, CommentsS } from '../models/bb';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  //
  post: POST;
  user: UserSignUp;
  nani = JSON.parse(localStorage.getItem('user')).id;

  userSignUp: UserSignUp[] = [];

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

  returnComments() {
    const url = 'https://gorest.co.in/public/v2/comments';
    return this.http.get(url);
  }
  returnPosts() {
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
  commentaPost(comment: CommentsS): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
    });
    return this.http.post(
      `https://gorest.co.in/public/v2/posts/${comment.post_id}/comments`,
      comment,
      { headers }
    );
  }
}

// createNewPost(post: {
//   UserID: number;
//   title: string;
//   body: string;
// }): Observable<object> {
//   const url = `https://gorest.co.in/public/v2/users/${post.UserID}/posts`;

//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
//   });

//   return this.http.post(url, post, { headers }).pipe(
//     tap((response: any) => {
//       const newPostUserId = response.user_id;
//       this.GetAll(newPostUserId);
//       console.log(newPostUserId);
//       this.Refreshrequired.next();
//     })
//   );
// }

// GetAll(userId?: number): Observable<object> {
//   const url = `https://gorest.co.in/public/v2/users/${userId}/posts`;
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     Authorization: `Bearer c0ee8a9640f985ebdce1b6e529043ac347f0f1e62ebd980a6dfe93aff7827693`,
//   });
//   return this.http.get(url, { headers });
// }
