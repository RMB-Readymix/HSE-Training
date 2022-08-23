import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { ErrorService } from 'src/app/common/services/error.service';
import { ContentRecords } from 'src/app/models/content-record';
import { TaskRecord } from 'src/app/models/task-record';
import { HseService } from 'src/app/services/hse.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public contentRecords : ContentRecords[] | any;
  public taskRecords : TaskRecord | any;
  

  constructor( private ngxService : NgxSpinnerService , 
               private errorService : ErrorService , 
               private hseService : HseService ,
               private router : Router ) { }

  ngOnInit(): void {
    this.getContentRecords()
    this.getTaskRecords()
    console.log('tasks',this.taskRecords)
    console.log('contents',this.contentRecords)
  }


  getContentRecords(){
    this.ngxService.show();
    this.hseService.getContentRecord().subscribe({
      next : data => {
        this.contentRecords = data;
        this.ngxService.hide();
        console.log('contnets ',this.contentRecords)
      },
      error: err => {
        this.ngxService.hide();
        this.errorService.openErrorDialog(err); 
      }
    });
  }

  getTaskRecords(){
    this.ngxService.show();
    this.hseService.getTaskRecord().subscribe({
      next : data => {
        this.taskRecords = data;
        this.ngxService.hide()
        console.log('tasks',this.taskRecords)
      },
      error : err => {
        this.ngxService.hide()
        this.errorService.openErrorDialog(err)
      }
    })
  }

  getContentRecordDetails(id:number){
    this.router.navigate(['/user/training',id]);
  }

  public searchContnetRecords(key: string): void {

    const results: ContentRecords[] = [];

    for (const contentRecords of this.contentRecords) {
      if (contentRecords.title.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(contentRecords);
      };
    }
    this.contentRecords = results;
    if (results.length === 0 || !key) {
      this.getContentRecords()
    }
  }


}
