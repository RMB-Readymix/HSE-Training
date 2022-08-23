import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { ErrorService } from 'src/app/common/services/error.service';
import { ContentRecords } from 'src/app/models/content-record';
import { HseService } from 'src/app/services/hse.service';

@Component({
  selector: 'app-course-conf',
  templateUrl: './course-conf.component.html',
  styleUrls: ['./course-conf.component.css']
})
export class CourseConfComponent implements OnInit {
  
  public contentRecords : Observable<ContentRecords[]> | any;
  

  constructor( private ngxService : NgxSpinnerService , private errorService : ErrorService , private hseService : HseService ,private router : Router ) { }

  ngOnInit(): void {
    this.getContentRecords()
  }


  getContentRecords(){
    this.ngxService.show();
    this.hseService.getContentRecord().subscribe({
      next : data => {
        this.contentRecords = data;
        this.ngxService.hide();
      },
      error: err => {
        this.ngxService.hide();
        this.errorService.openErrorDialog(err); 
      }
    });
  }

  getContentRecordDetails(id:number){
    this.router.navigate(['/admin/content-preview',id]);
    // this.router.navigate(['/admin/course-edit',id]);
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
