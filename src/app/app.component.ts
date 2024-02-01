import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'city-guard-app';

  constructor(private authService: AuthService) {}

  //Keeping the LOGIN activated
  //when the user is logged in
  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.authService.createUser(
        user.name,
        user.email,
        user.gender,
        user.status
      );
    }
  }
}
