import { Component, OnInit } from '@angular/core';
import { UserRecords } from './models/user-record';
import { GlobalVariables } from './common/common-variables';
import { AuthServiceService } from './services/authenticationService/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'hse-training';
  
  constructor( private authService : AuthServiceService , private router:Router ) {}

  userData: UserRecords | any;
  
  public authenticatedOrNot = GlobalVariables.isAuthenticated


  async ngOnInit() {
    this.userData = GlobalVariables.authenticatedUserData;
    this.authenticatedOrNot;
    console.log('data',this.authenticatedOrNot)
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
