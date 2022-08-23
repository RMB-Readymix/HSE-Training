import { Component, OnInit } from '@angular/core';
import { UserRecords } from 'src/app/models/user-record';
import { FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HseService } from 'src/app/services/hse.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SuccessService } from 'src/app/common/services/success.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from 'src/app/common/services/error.service';
import { RmbDepartments } from 'src/app/models/rmbDepartments';
import { MessageTemplate } from 'src/app/models/message-template';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {

  public userrecords : UserRecords[] | undefined;
  public departments : RmbDepartments | any;

  async ngOnInit() {
    this.getDepartments()
  }

  // userRecords : UserRecords[] = [];

  constructor( private fb : FormBuilder , private hseService : HseService , private successService : SuccessService , private ngxSpinner : NgxSpinnerService , private errorService : ErrorService) { }

  // Add User Function

  public addUserRecord(addForm:NgForm):void{
    this.hseService.setUserRecord(addForm.value).subscribe(
      ( response : UserRecords ) => {
        var messageTemplate = new MessageTemplate();
        messageTemplate.header = "Hi " + response.name + ",";
        messageTemplate.body = "Your Account in HSE Training Platform is Successfully Created."+ "\nPlease see your Login Credentials Below.\n" + "\nUsername : " +response.email + "\nPassword : " + response.password +"\n";
        this.ngOnInit();
        this.sendMailNotification(response.email, messageTemplate);
        this.successService.openDialog("User Created Succesfully")
        addForm.reset();
        
      },
      ( error : HttpErrorResponse ) => {
        this.ngxSpinner.hide();
        this.errorService.openErrorDialog(error);
      }
    )
  }

  public getDepartments(){
    this.ngxSpinner.show()
    this.hseService.getRmbDepartments().subscribe({
      next : (data) => {
        this.departments = data;
        this.ngxSpinner.hide();
      },
      error : (err) => {
        this.ngxSpinner.hide();
        this.errorService.openErrorDialog(err);
      }
    })
  }

  sendMailNotification(to: String, messageTemplate: MessageTemplate) {
    // this.ngxSpinner.show();
    this.hseService.sendMail(to, messageTemplate).subscribe(
      {
        next: response => {
          // this.ngxSpinner.hide()
        },
        error: err => {
          // this.ngxSpinner.hide()
          this.errorService.openErrorDialog(err);
        }
      });
  }

}
