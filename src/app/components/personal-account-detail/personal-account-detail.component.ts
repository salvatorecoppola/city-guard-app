import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { UserSignUp } from '../../models/userSignup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/api-services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-account-detail',
  templateUrl: './personal-account-detail.component.html',
  styleUrls: ['./personal-account-detail.component.css'],
})
export class PersonalAccountDetailComponent implements OnInit {
  userSignUp: UserSignUp;
  userDetail: any;
  id: any;
  Id: any;
  homeform: FormGroup;
  isEditing: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getAccountId();
    this.homeform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl(null, Validators.required),
      gender: new FormControl(''),
      status: new FormControl(''),
    });
  }

  getAccountId() {
    this.userService.returnUser2(this.id).subscribe((data: UserSignUp) => {
      const id = data[0].id;
      this.userService.returnUser3(id).subscribe((oke: UserSignUp) => {
        this.userSignUp = oke;
        console.log(this.userSignUp);
      });
    });
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    // Reset form values if not editing
    if (!this.isEditing) {
      this.homeform.reset({
        email: this.userSignUp.email,
        name: this.userSignUp.name,
        gender: this.userSignUp.gender,
        status: this.userSignUp.status,
      });
    }
  }
  deletePersonalUser() {
    this.Id = this.userSignUp.id;
    console.log(this.Id);

    this.userService.deletePersonalUser(this.Id).subscribe((lol: any) => {
      this.userDetail = lol;
      localStorage.clear();
      console.log('qui ' + this.userDetail);
    });

    return this.router.navigate(['/signup']);
  }

  onSubmit() {
    if (this.homeform.valid) {
      const userData = {
        email: this.homeform.value.email,
        name: this.homeform.value.name,
        gender: this.homeform.value.gender,
        status: this.homeform.value.status,
        id: this.userSignUp.id,
      };
      this.userService.patchUser(userData).subscribe((data: any) => {
        console.log(data);
        this.isEditing = false; // Exit edit mode after submitting
        this.getAccountId(); // Reload user data after successful update
      });
    }
  }
}
