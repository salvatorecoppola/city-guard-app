import { Component, OnInit } from '@angular/core';
import { EmailValidator, Validators } from '@angular/forms';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  //As we said previously, here I am using **REACTIVE FORM
  homeform: FormGroup;

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    this.homeform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl(null, Validators.required),
      gender: new FormControl(''),
      status: new FormControl(''),
    });
  }

  onSubmit() {
    //Detecting the value from the login component and
    const email = this.homeform.value.email;
    const name = this.homeform.value.name;
    const gender = this.homeform.value.gender;
    const status = this.homeform.value.status;
    //Sending it to SessionService, wich will do
    //the control and comparision for the login
    this.AuthService.userLogin(name, email, gender, status);
  }
}
