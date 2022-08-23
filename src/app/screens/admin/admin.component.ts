import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/common/common-variables';
import { UserRecords } from 'src/app/models/user-record';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userData : UserRecords | any;

  constructor() { }

  async ngOnInit(){
    this.userData = GlobalVariables.authenticatedUserData;
    console.log(this.userData)
    console.log(GlobalVariables.authenticatedUserData)
  }

}
