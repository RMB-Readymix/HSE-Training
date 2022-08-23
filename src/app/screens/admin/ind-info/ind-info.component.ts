import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from 'src/app/common/services/error.service';
import { SuccessService } from 'src/app/common/services/success.service';
import { TaskRecord } from 'src/app/models/task-record';
import { HseService } from 'src/app/services/hse.service';

@Component({
  selector: 'app-ind-info',
  templateUrl: './ind-info.component.html',
  styleUrls: ['./ind-info.component.css']
})
export class IndInfoComponent implements OnInit {

  public taskRecords : TaskRecord[] | any;
  public deleteTaskRecords: TaskRecord | any;

  constructor( private ngxSpinner : NgxSpinnerService,
               private errorService : ErrorService,
               private hseService : HseService,
               private successService : SuccessService ) { }

  async ngOnInit() {
    this.gettaskRecords();
  }

  public gettaskRecords() {
    this.ngxSpinner.show();
    this.hseService.getTaskRecord().subscribe({
      next: data => {
        this.taskRecords = data;
        this.ngxSpinner.hide();
      },
      error: err => {
        this.ngxSpinner.hide();
        this.errorService.openErrorDialog(err);
      }
    }
    );
  }

  public onDeleteUserRecord(id: number): void {
    this.hseService.deleteTaskRecord(id).subscribe(
      (response: void) => {
        this.successService.openDialog('Task Deleted Successfully');
        this.gettaskRecords()
      },
      (error: HttpErrorResponse) => {
        this.errorService.openErrorDialog(HttpErrorResponse);
      }
    );
  }

  public onOpenModal(mode: string, taskRecord?: TaskRecord): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteTaskRecords = taskRecord;
      button.setAttribute('data-bs-target', '#deleteTaskRecordsModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
