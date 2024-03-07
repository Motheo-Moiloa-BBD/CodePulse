import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/authentication/data-access/models/user.model';
import { AuthenticationService } from 'src/app/authentication/data-access/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  user?: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationService.user().subscribe({
      next: (user) => {
        this.user = user;
      },
    });

    this.user = this.authenticationService.getUser();
  }

  onLogout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/home');
  }
}
