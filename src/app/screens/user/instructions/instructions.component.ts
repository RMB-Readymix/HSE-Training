import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalVariables } from 'src/app/common/common-variables';
import { ErrorService } from 'src/app/common/services/error.service';
import { SuccessService } from 'src/app/common/services/success.service';
import { ContentRecords } from 'src/app/models/content-record';
import { QuestionRecords } from 'src/app/models/q-record';
import { HseService } from 'src/app/services/hse.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  public id: number | any;
  public contentRecords: ContentRecords | any;
  public backendUrl = GlobalVariables.backendUrl;
  public qrecords: QuestionRecords[] | any;

  constructor(
    private hseService: HseService,
    private route: ActivatedRoute,
    private router: Router,
    private ngxSpinner : NgxSpinnerService,
    private errorService : ErrorService
  ) {}


  async ngOnInit() {
    this.getContenRecords();
    this.getqRecords();
    console.log('questions',this.qrecords)
    console.log('content',this.contentRecords)
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
      console.log('data',data)
    });
  }

  getContentRecordDetails(id:number){
    this.router.navigate(['/user/questions',id]);
  }
}
