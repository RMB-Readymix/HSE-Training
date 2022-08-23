import { Injectable } from '@angular/core';
import { GlobalVariables } from 'src/app/common/common-variables';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  authenticatedOrNot = GlobalVariables.isAuthenticated

  isAuthenticated:any;

  constructor() { 
    this.isAuthenticated = false;
  }

  isUserAuthenticated(){
    return this.isAuthenticated;
    this.authenticatedOrNot = true
  }

  login(){
    this.isAuthenticated = true ;
    this.authenticatedOrNot = true
  }

  logout(){
    this.isAuthenticated = false ;
    this.authenticatedOrNot = true
  }
}
