import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/common/services/error.service';
import { ContentRecords } from 'src/app/models/content-record';
import { UserRecords } from 'src/app/models/user-record';
import { HseService } from 'src/app/services/hse.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalUsers : UserRecords[] = [];
  totalCourses : ContentRecords[] = [];

  constructor( private hseService : HseService , private errorService : ErrorService) { }

  async ngOnInit(){

    // Get All Users

    this.hseService.getUserRecord().subscribe({
      next: res => {
        this.totalUsers = res;
      }, error: err => {
        this.errorService.openErrorDialog(err);
      }
    })

    // Get All Courses

    this.hseService.getContentRecord().subscribe({
      next: res => {
        this.totalCourses = res;
      }, error: err => {
        this.errorService.openErrorDialog(err);
      }
    })
  }

}
