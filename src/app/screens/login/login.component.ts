import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from 'src/app/common/services/error.service';
import { UserRecords } from 'src/app/models/user-record';
import { AuthServiceService } from 'src/app/services/authenticationService/auth-service.service';
import { HseService } from 'src/app/services/hse.service';
import { GlobalVariables } from 'src/app/common/common-variables';
import { DialogMaterialComponent } from 'src/app/common/material/dialog-material/dialog-material.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userRecord?:UserRecords;
  loginForm  : FormGroup | any;
  displayError : String = '';

  constructor( 
    private router : Router,
    private formBuilder : FormBuilder,
    private hseService : HseService,
    public dialog : MatDialog,
    private ngxService : NgxSpinnerService,
    private authService : AuthServiceService,
    private errorService : ErrorService,
    ) { }

  ngOnInit(): void {;
    this.displayError ='';

    this.loginForm = this.formBuilder.group({
      email : ['',[Validators.required]],
      password : ['',[Validators.required]]
    })
  }

  async submitLoginForm(values:any){
    if(this.loginForm.invalid)
      return;
    this.ngxService.show("getUserRecord");
    this.hseService.getUserRecordByEmail(values.email).subscribe(
      {
        next:data => {
          this.userRecord = data;
          this.ngxService.hide("getUserRecord")
          this.authenticateUser(values.password);
        },
        error: err => {
          this.ngxService.hide("getUserRecord");
          this.errorService.openErrorDialog(err);
        }
      }
    );
  }

  authenticateUser(userEnteredPassword : String ){
    if(this.userRecord == undefined){
      this.displayError = "User Not Found..!";
      return;
    }

    if (this.userRecord != undefined){
      const password = this.userRecord.password;

      if ( password != userEnteredPassword){
        this.displayError = "Password Mismatch..!";
      }
      else {
        if(this.userRecord.isAdmin == "yes"){
          GlobalVariables.authenticatedUserData = this.userRecord;
          this.authService.login();
          console.log(this.userRecord)
          this.router.navigateByUrl("/admin/dashboard");
        }
        else{
          GlobalVariables.authenticatedUserData = this.userRecord;
          this.authService.login();
          this.router.navigateByUrl("/user/dashboard");
          console.log(this.userRecord)
        }
        
      }
    }
  }

  public loginErrorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  }

  forgotPassword(){
    this.openDialog("Please Contact IT Department..!")
  }

  openDialog(dialogContent: String): void {

    const dialogRef = this.dialog.open(DialogMaterialComponent, {
      width: '350px',
      data: { content: dialogContent }
    });
    dialogRef.afterClosed().subscribe();
  }

}
