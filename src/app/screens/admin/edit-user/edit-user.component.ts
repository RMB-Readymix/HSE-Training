import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from 'src/app/common/services/error.service';
import { HseService } from 'src/app/services/hse.service';
import { UserRecords } from 'src/app/models/user-record';
import { HttpErrorResponse } from '@angular/common/http';
import { SuccessService } from 'src/app/common/services/success.service';
import { RmbDepartments } from 'src/app/models/rmbDepartments';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  public userRecords: UserRecords[]=[];
  public deleteUserRecords: UserRecords | any;
  public updateUserRecords: UserRecords | any;
  public departments: RmbDepartments | any;

  pageIndex: number = 0;

  department: string = '';
  findBy: string = '';


  constructor(
    private ngxSpinner: NgxSpinnerService,
    private hseService: HseService,
    private errorService: ErrorService,
    private successService: SuccessService
  ) {}

  async ngOnInit() {
    this.getUserRecord(0);
    this.getDepartments()
  }

  // Get User Finction

  public getUserRecord(pageIndex : number){
    this.ngxSpinner.show("getUserRecord");

    if(this.findBy == "find by all"){
      this.hseService.getUserRecordByDepartment('',pageIndex).subscribe({
        next : data => {
          this.userRecords = data;
          this.ngxSpinner.hide("getUserRecord")
        },
        error : err => {
          this.ngxSpinner.hide("getUserRecord");
          this.errorService.openErrorDialog(err)
        }
      })
    } else if (this.findBy === 'find by department'){
      this.hseService.getUserRecordByDepartment(this.department , pageIndex).subscribe({
        next : data => {
          this.userRecords = data;
          this.ngxSpinner.hide("getUserRecord");
        },
        error : err => {
          this.ngxSpinner.hide("getUserRecord");
          this.errorService.openErrorDialog(err)
        }
      })
    }
  }

  changePage(clicked : String){

    if (clicked === "Previous"){
      this.pageIndex--;
    }
    if (clicked === "Next"){
      this.pageIndex++;
    }
    this.getUserRecord(this.pageIndex)
  }

  setvalues(department: HTMLSelectElement, findBy: HTMLSelectElement) {
    this.department = department.value;
    this.findBy = findBy.value;
    this.getUserRecord(0);
  }


  public getDepartments() {
    this.ngxSpinner.show();
    this.hseService.getRmbDepartments().subscribe({
      next: (data) => {
        this.departments = data;
        this.ngxSpinner.hide();
      },
      error: (err) => {
        this.ngxSpinner.hide();
        this.errorService.openErrorDialog(err);
      },
    });
  }

  // Update User Fuction

  public onUpdateUserRecords(userRecord: UserRecords): void {
    this.ngxSpinner.show();
    this.hseService.updateUserRecord(userRecord).subscribe(
      (response: UserRecords) => {
        this.getUserRecord(0);
        this.successService.openDialog('Changes Saved Successfully');
        this.ngxSpinner.hide();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Delete USer Function

  public onDeleteUserRecord(id: number): void {
    this.hseService.deleteUserRecord(id).subscribe(
      (response: void) => {
        this.successService.openDialog('User Deleted Successfully');
        this.getUserRecord(0);
      },
      (error: HttpErrorResponse) => {
        this.errorService.openErrorDialog(HttpErrorResponse);
      }
    );
  }

  // Search Question Function

  public searchUserRecords(key: string): void {
    const results: UserRecords[] = [];

    for (const userRecord of this.userRecords) {
      if (
        userRecord.fileNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
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
      this.getUserRecord(0);
    }
  }

  // Modal Logic

  public onOpenModal(mode: string, userRecord?: UserRecords): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteUserRecords = userRecord;
      button.setAttribute('data-bs-target', '#deleteUserRecordsModal');
    }
    if (mode === 'update') {
      this.updateUserRecords = userRecord;
      button.setAttribute('data-bs-target', '#updateUserRecordsModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
