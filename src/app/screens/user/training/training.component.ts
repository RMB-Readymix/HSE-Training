import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalVariables } from 'src/app/common/common-variables';
import { ErrorService } from 'src/app/common/services/error.service';
import { SuccessService } from 'src/app/common/services/success.service';
import { ContentRecords } from 'src/app/models/content-record';
import { HseService } from 'src/app/services/hse.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  public id: number | any;
  public contentRecords: ContentRecords | any;
  public backendUrl = GlobalVariables.backendUrl;

  constructor(
    private hseService: HseService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.getContenRecords();
  }

  getContenRecords() {
    this.id = this.route.snapshot.params['id'];
    this.hseService.geContnetRecordById(this.id).subscribe((data) => {
      this.contentRecords = data;
      console.log('data',data)
    });
  }

  getContentRecordDetails(id:number){
    this.router.navigate(['/user/instructions',id]);
    // this.router.navigate(['/admin/course-edit',id]);
  }

}
