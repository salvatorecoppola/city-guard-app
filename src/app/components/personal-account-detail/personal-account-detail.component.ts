import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { userFromLogin } from '../../models/userFromLogin';
import { UserSignUp } from '../../models/userSignup';

@Component({
  selector: 'app-personal-account-detail',
  templateUrl: './personal-account-detail.component.html',
  styleUrl: './personal-account-detail.component.css',
})
export class PersonalAccountDetailComponent implements OnInit {
  userSignUp: any[] = [];

  constructor(private database: DatabaseService) {}

  ngOnInit(): void {
    const id = JSON.parse(localStorage.getItem('user')).id;
    this.getAccount(id);
    console.log(typeof id);
  }

  getAccount(id: number) {
    this.database.returnUser2(id).subscribe((data: any) => {
      this.userSignUp = Object.keys(data).map((key) => {
        return [data[key]];
      });
    });
  }
}
