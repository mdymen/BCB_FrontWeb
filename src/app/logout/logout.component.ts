import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService) {
      localStorage.clear();
      location.assign("/");
      this.authService.signOut();
   }

  ngOnInit() {
  }

}
