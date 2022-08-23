import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalVariables } from 'src/app/common/common-variables';
import { ErrorService } from 'src/app/common/services/error.service';
import { SuccessService } from 'src/app/common/services/success.service';
import { UserRecords } from 'src/app/models/user-record';
import { HseService } from 'src/app/services/hse.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit { 

  public userData : UserRecords | any;

  public isEditable : boolean = false;
  public isEditingPassword : boolean = false;

  public phNumber : string = '';
  public location : string = '';
  public password : string = '';
  public confirmPassword : string = '';
  public errorMessage : string = '';


  constructor(private ngxSpinner: NgxSpinnerService,
              private hseService: HseService,  
              private errorService: ErrorService,
              private successService : SuccessService) { }

  async ngOnInit(){
    this.userData = GlobalVariables.authenticatedUserData;
  }

  edit(){
    this.isEditable = !this.isEditable;
    this.isEditingPassword = false;
  }

  editingPassword(){
    if ((this.password).length <= 0){
      this.isEditingPassword = false;
    }else{
      this.isEditingPassword = true;
    }
  }

  checkPassword(){
    if(this.password !== this.confirmPassword){
      this.errorMessage = " Password Mismatch..! "
    }else {
      this.errorMessage = "";
    }
  }

  update(){
    if (this.location === '' && this.phNumber === '' && this.password === ''){
      this.isEditable = false;
      return;
    }
    if (this.errorMessage.length > 0 || this.isEditingPassword && this.confirmPassword.length <= 0){
      this.errorMessage = "Enter Password Again..."
    }

    this.ngxSpinner.show();

    this.userData.location = this.location.length > 0 ? this.location : this.userData.location;
    this.userData.phoneNumber = this.phNumber.length > 0 ? this.phNumber : this.userData.phoneNumber

    if(this.isEditingPassword && this.confirmPassword.length > 0){
      const cpassword = this.password
      this.userData.password = cpassword;
    }

      this.hseService.updateUserRecord(this.userData).subscribe(
        {
          next : data => {
            GlobalVariables.authenticatedUserData = this.userData;
            this.ngxSpinner.hide()
            this.successService.openDialog("Your Profile Changes has been Recorded Successfully..")
          },
          error : err => {
            this.ngxSpinner.hide()
            this.errorService.openErrorDialog(err)
          }
        }
      );
    this.isEditable = false;
  }
}
