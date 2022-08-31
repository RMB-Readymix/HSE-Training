import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from 'src/app/common/services/error.service';
import { SuccessService } from 'src/app/common/services/success.service';
import { ContentRecords } from 'src/app/models/content-record';
import { QuestionRecords } from 'src/app/models/q-record';
import { HseService } from 'src/app/services/hse.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public qrecords: QuestionRecords[] | any;
  public id: number | any;
  public contentRecords: ContentRecords[] | any;
  public qrecordsCount : QuestionRecords[] | any;

  secondsLeft: number = 10;
  minutesLeft: number = 0;
  interval: any;


  constructor(private hseService: HseService,
             private ngxSpinner: NgxSpinnerService, 
             private errorService: ErrorService , 
             private successService : SuccessService,  
             private route: ActivatedRoute,
             private router: Router,) { }

  async ngOnInit() {
    this.getqRecords();
    this.getContenRecords()
    console.log(this.qrecords)
  }

  goToScore(){
    this.router.navigate(['/user/score']);
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

  getContenRecords() {
    this.id = this.route.snapshot.params['id'];
    this.hseService.geContnetRecordById(this.id).subscribe((data) => {
      this.contentRecords = data;

      console.log(this.contentRecords);
    });
  }

   getContentRecordDetails(id:number){
    this.router.navigate(['/user/score',id]);
    // this.router.navigate(['/admin/course-edit',id]);
  }

  // startTimer() {

  //   this.secondsLeft = 10;
  //   this.minutesLeft = 0;
  //   this.interval = setInterval(() => {
  //     if (this.minutesLeft <= 0 && this.secondsLeft <= 0) {
  //       this.ngxSpinner.show()
  //       this.goToScore()
  //       this.ngxSpinner.hide()
  //     }
  //     else {
  //       if (this.secondsLeft > 0) {
  //         this.secondsLeft--;
  //       } else {
  //         this.secondsLeft = 60;
  //         this.minutesLeft--;
  //       }
  //     }
  //   }, 1000);
  // }

}
