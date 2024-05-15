import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { HttpClient } from '@angular/common/http';
import { UserSignUp } from '../models/userSignup';
import { StandardComments, userComments } from '../models/comments';
import { StandardPosts } from '../models/standardPosts';
import { Post } from '../models/post';
import { UserService } from '../services/api-services/user.service';
import { NewPostService } from '../services/api-services/new-post.service';
import { CommentsService } from '../services/api-services/comments.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userSignUp: UserSignUp[] = [];
  standardPosts: StandardPosts[] = [];
  standardComments: StandardComments[];
  postlist$: Post[] = [];
  post$: any;
  comment: userComments;
  commentlist$: userComments[];
  Standardcommentlist$: userComments[];
  post_id: number;
  comment_id: number;
  searchValue: string = '';
  post: Post[] = [];
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });

  constructor(
    private dataBase: DatabaseService,
    private userService: UserService,
    private postService: NewPostService,
    private commentService: CommentsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.showComment();
    this.commentService.GetAllComments;
    this.onComment;
    this.onCommentStandard;
    this.postService.returnStandardPosts();
    this.GetAll();
    this.GetNewPost();
    this.postService.Refreshrequired.subscribe((response) => {
      this.GetNewPost();
    });

    this.postService.Refreshrequired.subscribe((response) => {
      this.GetAll();
    });

    this.userService.returnUser().subscribe((data: any) => {
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
    this.postService
      .returnStandardPosts()
      .subscribe((standardPost: StandardPosts[]) => {
        this.standardPosts = standardPost;
        console.log(this.standardPosts);
      });
    //Retrieving standard comments from API;
    this.commentService
      .returnComments()
      .subscribe((standardComment: StandardComments[]) => {
        this.standardComments = standardComment;
      });
  }

  //Posting custom post in to API;
  //taking data from home.compomnent.html NGFORM
  //and passing it to database for put the data
  //in to another function (createNewPost)
  //wich will send data to the server
  onPost(newPost: { title: string; body: string }) {
    //and make the refresh of the function nested in it
    this.postService.createNewPost(newPost).subscribe((data: any) => {
      newPost = data;
    });
  }

  //Getting the custom post previously sended on th server.
  //and here we will display them in to HTML
  //calling in ngOnInit and make sure refresh it
  //every time we write a post.
  GetNewPost() {
    this.postService.GetNewPost().subscribe((data: Post[]) => {
      this.postlist$ = data;
      return data;
    });
  }

  GetAll() {
    this.postService.GetAll().subscribe((data: Post[]) => {
      this.post$ = data;
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
  //the post received by the api
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
    this.commentService
      .commentStandardPost(this.comment)
      .subscribe((salto: StandardComments[]) => {
        if (this.Standardcommentlist$) {
          this.Standardcommentlist$[0].name.length == 0;
        } else {
          this.Standardcommentlist$[0].name = 'mammt';
        }
        console.log(this.Standardcommentlist$[0].name);
        salto;
      });
    //commentaStandardPost we will send back our processed data
    // and we call another function that return the comment that
    // we have made under our post
    this.commentService
      .GetAllComments2()
      .subscribe((salto: StandardComments[]) => {
        this.Standardcommentlist$ = salto;
      });

    //here we are making the refresh of comments for
    //having them in real time
    this.commentService.Refreshrequired.subscribe((response) => {
      this.showComment();
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
    this.commentService
      .commentaPost(this.comment)
      .subscribe((result: StandardComments[]) => {
        result;
      });
    //commentaPost we will send back our processed data
    // and we call another function that return the comment that
    // we have made under our post
    this.commentService
      .GetAllComments(this.comment.post_id)
      .subscribe((result: StandardComments[]) => {
        this.commentlist$ = result;
        console.log(this.commentlist$);
      });
    //here we are making the refresh of comments for
    //having them in real time
    this.commentService.Refreshrequired.subscribe((response) => {
      this.showComment();
    });
  }
  showComment() {
    this.commentService
      .GetAllComments2()
      .subscribe((salto: StandardComments[]) => {
        this.Standardcommentlist$ = salto;
        if (salto) console.log(salto);
      });
  }
  // onDeletePost(id: number) {
  //   this.postService.onDeletePost(id).subscribe();
  //   console.log(id);
  // }

  fetchData(): void {
    this.postService.searchPost(this.searchValue).subscribe((post) => {
      this.post = post;
    });
  }

  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue;
    this.fetchData();
  }
}
