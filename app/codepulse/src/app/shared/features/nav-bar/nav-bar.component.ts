import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/data-access/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.user().subscribe({
      next: (user) => {
        console.log(user);
      },
    });
  }
}
