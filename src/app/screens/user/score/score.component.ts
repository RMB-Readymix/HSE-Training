import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalVariables } from 'src/app/common/common-variables';
import { ErrorService } from 'src/app/common/services/error.service';
import { SuccessService } from 'src/app/common/services/success.service';
import { ContentRecords } from 'src/app/models/content-record';
import { QuestionRecords } from 'src/app/models/q-record';
import { UserRecords } from 'src/app/models/user-record';
import { HseService } from 'src/app/services/hse.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  public qrecords: QuestionRecords[] | any;
  public id: number | any;
  public contentRecords: ContentRecords | any;
  public userData : UserRecords | any;

  constructor(private hseService: HseService,
    private ngxSpinner: NgxSpinnerService, 
    private errorService: ErrorService , 
    private successService : SuccessService,  
    private route: ActivatedRoute,
    private router: Router,) { }

  async ngOnInit() {

    this.userData = GlobalVariables.authenticatedUserData;
    this.getContenRecords();
    this.getqRecords(); 
  }

  getContenRecords() {
    this.id = this.route.snapshot.params['id'];
    this.hseService.geContnetRecordById(this.id).subscribe((data) => {
      this.contentRecords = data;
      console.log(this.contentRecords);
    });
  }


  public getqRecords() {
    this.ngxSpinner.show();
    this.hseService.getQuestionRecord().subscribe({
      next: data => {
        this.qrecords = data;
        this.ngxSpinner.hide();
      },
      error: err => {
        this.ngxSpinner.hide();
        this.errorService.openErrorDialog(err);
      }
    }
    );
  }

}
