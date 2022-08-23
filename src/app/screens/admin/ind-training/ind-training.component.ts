import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { ErrorService } from 'src/app/common/services/error.service';
import { SuccessService } from 'src/app/common/services/success.service';
import { ContentRecords } from 'src/app/models/content-record';
import { MessageTemplate } from 'src/app/models/message-template';
import { TaskRecord } from 'src/app/models/task-record';
import { UserRecords } from 'src/app/models/user-record';
import { HseService } from 'src/app/services/hse.service';

@Component({
  selector: 'app-ind-training',
  templateUrl: './ind-training.component.html',
  styleUrls: ['./ind-training.component.css'],
  providers: [DatePipe]
})
export class IndTrainingComponent implements OnInit {
  public contentRecords: Observable<ContentRecords[]> | any;
  public userRecords: Observable<UserRecords[]> | any;
  public taskRecords: TaskRecord[] | undefined;

  public selectedCourseList: any[] = [];
  public selectedUserList: any[] = [];

  myDates: any;

  constructor(
    private ngxService: NgxSpinnerService,
    private hseService: HseService,
    private errorService: ErrorService,
    private successService: SuccessService,
    private ngxSpinner: NgxSpinnerService, 
    private datePipe: DatePipe
  ){this.myDates = this.datePipe.transform(new Date(), 'dd-MM-yyyy');}



  ngOnInit(): void {
    this.getContentRecords();
    this.getUserRecords();

    this.fetchSelectedCourses();
    this.fetchSelectedUsers();
    
    this.changeCourseSelection()
    this.changeUsersSelection()
  }


  public addTaskRecord(addForm: NgForm): void {
    this.hseService.setTaskRecord(addForm.value).subscribe(
      (response: TaskRecord) => {
        var messageTemplate = new MessageTemplate();
        messageTemplate.header = "Hi " + response.employeeName + ",";
        messageTemplate.body = "You " + "have been Assigned " + response.courseName + " with Completion Date " + response.endDate + "\nPlease Complete Assigned Task before Due Date.\n";
        this.ngOnInit();
        this.sendMailNotification(response.employeeEmail, messageTemplate);
        this.successService.openDialog('Task Assigned Succesfully');
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.ngxSpinner.hide();
        this.errorService.openErrorDialog(error);
      }
    );
  }

  changeCourseSelection() {
    this.fetchSelectedCourses();
  }

  changeUsersSelection() {
    this.fetchSelectedUsers();
  }

  fetchSelectedCourses() {
    this.selectedCourseList = this.contentRecords.filter(
      (value: { isChecked: any }, index: any) => {
        return value.isChecked;
      }
    );
  }

  fetchSelectedUsers() {
    this.selectedUserList = this.userRecords.filter(
      (value: { isChecked: any }, index: any) => {
        return value.isChecked;
      }
    );
  }

  getContentRecords() {
    this.ngxService.show();
    this.hseService.getContentRecord().subscribe({
      next: (data) => {
        this.contentRecords = data;
        this.ngxService.hide();
      },
      error: (err) => {
        this.ngxService.hide();
        this.errorService.openErrorDialog(err);
      },
    });
  }

  getUserRecords() {
    this.ngxService.show();
    this.hseService.getUserRecord().subscribe({
      next: (data) => {
        this.userRecords = data;
        this.ngxService.hide();
      },
      error: (err) => {
        this.ngxService.hide();
        this.errorService.openErrorDialog(err);
      },
    });
  }

  public searchUserRecords(key: string): void {
    const results: UserRecords[] = [];
    for (const userRecord of this.userRecords) {
      if (
        userRecord.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        userRecord.department.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        userRecord.designation.toLowerCase().indexOf(key.toLowerCase()) !==
          -1 ||
        userRecord.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) !==
          -1 ||
        userRecord.location.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        userRecord.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(userRecord);
      }
    }
    this.userRecords = results;
    if (results.length === 0 || !key) {
      this.getUserRecords();
    }
  }

  public searchCourseRecords(keyuser: string): void {
    const results: ContentRecords[] = [];

    for (const contentRecord of this.contentRecords) {
      if (
        contentRecord.title.toLowerCase().indexOf(keyuser.toLowerCase()) !== -1
      ) {
        results.push(contentRecord);
      }
    }
    this.contentRecords = results;
    if (results.length === 0 || !keyuser) {
      this.getContentRecords();
    }
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
