import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { HttpClient } from '@angular/common/http';
import { UserSignUp } from '../models/userSignup';
import { StandardComments, userComments } from '../models/comments';
import { StandardPosts } from '../models/standardPosts';
import { Post } from '../models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userSignUp: UserSignUp[] = [];
  standardPosts: StandardPosts[] = [];
  standardComments: StandardComments[] = [];
  postlist$: Post[] = [];
  comment: userComments;
  commentlist$: userComments[];
  Standardcommentlist$: userComments[];
  post_id: number;
  comment_id: number;

  constructor(private dataBase: DatabaseService) {}

  ngOnInit(): void {
    this.showComment;
    this.dataBase.GetAllComments;
    this.onComment;
    this.onCommentStandard;
    this.dataBase.returnStandardPosts();
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
    //Retrieving standard posts from API;
    this.dataBase
      .returnStandardPosts()
      .subscribe((standardPost: StandardPosts[]) => {
        this.standardPosts = standardPost;
      });
    //Retrieving standard comments from API;
    this.dataBase
      .returnComments()
      .subscribe((standardComments: StandardComments[]) => {
        this.standardComments = Object.keys(standardComments).map((key) => {
          return standardComments[key];
        });
      });
  }

  //Posting custom post in to API;
  //taking data from home.compomnent.html NGFORM
  //and passing it to database for put the data
  //in to another function (createNewPost)
  //wich will send data to the server
  onPost(newPost: { title: string; body: string }) {
    //and make the refresh of the function nested in it
    this.dataBase.createNewPost(newPost).subscribe((data: any) => {
      newPost = data;
    });
  }

  //Getting the custom post previously sended on th server.
  //and here we will display them in to HTML
  //calling in ngOnInit and make sure refresh it
  //every time we write a post.
  GetAll() {
    this.dataBase.GetAll().subscribe((data: Post[]) => {
      this.postlist$ = data;
      return data;
    });
  }

  //Called in to comment form in
  //home.component.hmtl, this function
  //will send the id from the clicked comment
  //so we can display the right comment at the right post
  getCommentId(commentId: number) {
    console.log('Comment ID:', commentId);
  }

  //In this function we are going
  //to be able to write comments under
  //the post received bi the api
  onCommentStandard(form: any, postId: number) {
    //taking the required data for the POST request
    const body = form.body;
    this.comment = {
      name: JSON.parse(localStorage.getItem('user')).name,
      email: JSON.parse(localStorage.getItem('user')).email,
      body: body,
      post_id: postId,
    };
    //now send them in our database
    //and make the POST request
    this.dataBase
      .commentStandardPost(this.comment)
      .subscribe((salto: StandardComments[]) => {
        salto;
      });
    //commentaStandardPost we will send back our processed data
    // and we call another function that return the comment that
    // we have made under our post
    this.dataBase.GetAllComments2().subscribe((salto: StandardComments[]) => {
      this.Standardcommentlist$ = salto;
      console.log(salto);
    });

    //here we are making the refresh of comments for
    //having them in real time
    this.dataBase.Refreshrequired.subscribe((response) => {
      this.onCommentStandard;
    });
  }

  //The custom comment logic
  onComment(form: any, postId: number) {
    //taking the required data for the POST request
    const body = form.body;
    this.comment = {
      name: JSON.parse(localStorage.getItem('user')).name,
      email: JSON.parse(localStorage.getItem('user')).email,
      body: body,
      post_id: postId,
    };
    //now send them in our database
    //and make the POST request
    this.dataBase
      .commentaPost(this.comment)
      .subscribe((result: StandardComments[]) => {
        result;
      });
    //commentaPost we will send back our processed data
    // and we call another function that return the comment that
    // we have made under our post
    this.dataBase
      .GetAllComments(this.comment.post_id)
      .subscribe((result: StandardComments[]) => {
        this.commentlist$ = result;
      });
    //here we are making the refresh of comments for
    //having them in real time
    this.dataBase.Refreshrequired.subscribe((response) => {
      this.onComment;
    });
  }
  showComment(comment_id: number) {
    console.log(comment_id);
    this.dataBase
      .GetAllComments(comment_id)
      .subscribe((result: StandardComments[]) => {
        this.commentlist$ = result;
        console.log(this.commentlist$);
      });
    this.dataBase.GetAllComments2().subscribe((salto: StandardComments[]) => {
      this.Standardcommentlist$ = salto;
      console.log(this.Standardcommentlist$);
    });
  }
}
