import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'city-guard-app';

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  //Keeping the LOGIN activated
  //when the user is logged in
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
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
