import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { TokenInterceptorService } from '../../components/token/token-interceptor.service';
import { userComments } from '../../models/comments';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
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

  returnComments() {
    const url = 'https://gorest.co.in/public/v2/comments';
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
    const url = `https://gorest.co.in/public/v2/comments?page=1&per_page=100`;

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
}
