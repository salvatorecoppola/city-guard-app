import { Component, OnInit } from '@angular/core';
import { UserSignUp } from '../../models/userSignup';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { userFromSignup } from '../../models/userFromSignup';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  userId: any;
  userDetail: any;
  isProfile: boolean;
  userSignUp: UserSignUp[] = [];

  constructor(
    private dataBase: DatabaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPersoneID();
  }

  getPersoneID() {
    this.dataBase.returnUser().subscribe((data: any) => {
      this.userSignUp = data;
      //1
      //Retrieving user for display them in HTML
      //as a list with ngFor in user.component.html

      //2 *PART 2 IN HTML*

      //3
      //Wrapping the id received for use it later in API call
      this.userId = this.route.snapshot.paramMap.get('id');

      if (this.route.snapshot.paramMap.get('id')) {
        this.isProfile = true;
        this.userDetail = this.getPersona(this.userId);
        //Passing the id
      }
    });
  }

  getPersona(index: number) {
    //5 make the call happen
    this.dataBase.returnUser2(this.userId).subscribe((data: any) => {
      this.userDetail = data;
    });
  }
  //and then make display it in HTML
}
