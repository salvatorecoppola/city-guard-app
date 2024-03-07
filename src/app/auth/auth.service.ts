import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { userFromSignup } from '../models/userFromSignup';
import { userFromLogin } from '../models/userFromLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Ok, we are currently in very important part
  //of my project, so stay very focused.

  //1) First of all I am initializing two Interface'propreties,
  //they will be used for our User.

  //2) Second initializing propreties for use
  //them in AUTHGUARD.

  //Then we will receive the data from our
  //previus forms and use them for:

  //3) Check that all information from signup
  //are currently right, then the user can
  //have access to login.

  //4)In the fourth part there will be
  //the comparison from the data that we get from
  //the LoginForm and the data stored in LOCALSTORAGE.
  //If everything is fine, the result of LOGGED will be
  //truthy and we will be redirected in our HOMEPAGE
  //AUTHSERVICE & AUTHGUARD are working simultaneously

  //1)
  userFromSignup: userFromSignup;
  userFromLogin: userFromLogin;

  constructor(private router: Router) {}

  //2
  logged: boolean;
  signup: boolean;

  //3
  createUser(name: string, email: string, gender: string, status: string) {
    this.userFromSignup = new userFromSignup(name, email, gender, status);
    if (this.userFromSignup) {
      return (this.signup = true);
    } else return false;
  }

  //4
  userLogin(name: string, email: string, gender: string, status: string) {
    this.userFromLogin = new userFromSignup(name, email, gender, status);

    const isUserExist = JSON.parse(localStorage.getItem('user'));
    if (
      isUserExist.name === name &&
      isUserExist.email === email &&
      isUserExist.gender === gender &&
      isUserExist.status === status
    ) {
      this.logged = true;
      console.log(this.logged);
      return this.router.navigate(['']);
    } else {
      console.log('false');

      return (this.logged = false);
    }
  }
}
