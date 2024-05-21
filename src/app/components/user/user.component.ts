import { Component, OnInit } from '@angular/core';
import { UserSignUp } from '../../models/userSignup';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/api-services/user.service';

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
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPersoneID();
  }

  getPersoneID() {
    this.userService.returnUser().subscribe((data: any) => {
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

  getPersona(id: number) {
    //5 make the call happen
    this.userService.returnUser3(this.userId).subscribe((data: any) => {
      this.userDetail = data;
    });
  } //and then make display it in HTML

  deleteUser(index: number) {
    //5 make the call happen
    this.userService.deleteUser(this.userId).subscribe((data: any) => {
      this.userDetail = data;
      return this.router.navigate(['/user']);
    });
  }
}
