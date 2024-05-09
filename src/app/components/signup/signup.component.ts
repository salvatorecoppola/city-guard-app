import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TokenInterceptorService } from '../token/token-interceptor.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  //INTRODUCTION
  //Here is were I started my project,
  //I liked to use for the SIGNUP form the **Template Driven Form,
  //instead, in LOGIN form I used **Reactive Form

  //How the signup and login logic work?
  //So,we take the data from our Form.

  constructor(
    //Currently operating with API in DatabaseService
    private DataService: DatabaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  //1 signUp()
  //Here we will detect the data from the registration form
  //in the fist function we send it in our api link
  //using http method POST

  //2 createUser()
  //In second we will send it to AUTHSERVICE and storage it
  //then we will compare with the data from login

  //3 setItem()
  //In third operation we will set Item in LocalStorage
  //After sending data and creating newUser in AUTHSERVICE
  //we setItem as 'user' and storage the information we have taken
  //from registraion form.

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const gender = form.value.gender;
    const status = form.value.status;
    const token = localStorage.setItem('token', form.value.token);

    //1
    this.DataService.signUp({
      name: name,
      email: email,
      gender: gender,
      status: status,
    }).subscribe((data: any) => {
      //2
      this.authService.createUser(
        data.name,
        data.email,
        data.gender,
        data.status
      );

      //3
      localStorage.setItem(
        'user',
        JSON.stringify(this.authService.userFromSignup)
      );
      this.router.navigate(['/login']);
      console.log(this.authService.userFromSignup);

      //now we have successfully stored the data
      //receivd from the registration
      //wich are ready from being used in AuthService.
    });
  }
}
