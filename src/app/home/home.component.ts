import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { HttpClient } from '@angular/common/http';
import { UserSignUp } from '../models/aa';
import { Comments, CommentsS } from '../models/bb';
import { POST } from '../models/cc';
import { title } from 'process';
import { Observable, of } from 'rxjs';
import { Root2 } from '../models/id';
import { Post } from '../models/post';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userSignUp: UserSignUp[] = [];
  comments: Comments[] = [];
  comment: CommentsS;
  post: Root2[] = [];
  post_id: any;

  destlist$: any;
  constructor(private dataBase: DatabaseService, private http: HttpClient) {}

  ngOnInit(): void {
    this.dataBase.returnPosts();
    this.GetAll();
    this.dataBase.Refreshrequired.subscribe((response) => {
      this.GetAll();
    });

    this.dataBase.returnUser().subscribe((data: any) => {
      this.userSignUp = data;
      console.log(data);
      const fratm = data[0].id;
      // Retrieve the object from localStorage
      const retrievedUser = JSON.parse(localStorage.getItem('user'));
      retrievedUser.id = fratm;
      // Convert the modified object back to a JSON string
      const updatedDataString = JSON.stringify(retrievedUser);
      // Save the updated object back to the localStorage
      localStorage.setItem('user', updatedDataString);
      console.log(updatedDataString);
      return data;
    });
    this.dataBase.returnComments().subscribe((comments: Comments[]) => {
      comments.map((comment) => comment.id);

      this.comments = Object.keys(comments).map((key) => {
        const commentID = [key];
        return comments[key];
      });
      console.log(this.comments);
    });
    this.dataBase.returnPosts().subscribe((data: any) => {
      this.post = data;
      console.log(this.post);
    });
  }

  onPost(newPost: { title: string; body: string }) {
    this.dataBase.createNewPost(newPost).subscribe((data: any) => {
      newPost = data;
      console.log(newPost);
    });
  }

  GetAll() {
    this.dataBase
      .GetAll()
      .subscribe(
        (result) => (
          (this.destlist$ = result),
          console.log(result),
          console.log(this.destlist$)
        )
      );
  }

  sendInfo(item: string) {
    [this.destlist$.user_id];
    this.comment = {
      name: JSON.parse(localStorage.getItem('user')).name,
      email: JSON.parse(localStorage.getItem('user')).email,
      body: item,
      post_id: this.destlist$[0].id,
    };
    console.log(this.destlist$);
    this.dataBase
      .commentaPost(this.comment)
      .subscribe((result) => ((this.comment = result), console.log(result)));
    // Qui puoi implementare la logica per inviare le informazioni aggiuntive al tuo backend o fare qualsiasi altra operazione necessaria
    console.log('Info:', this.post_id);
    console.log('COMMENT:', this.comment);
  }
}
