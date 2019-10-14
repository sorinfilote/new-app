import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../auth/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  appName = 'TaskTool';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUserFromLocalStorage().subscribe(authUser => {
      this.currentUser = authUser;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate( ['/login']);
  }

}
