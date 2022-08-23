import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from 'src/app/common/services/error.service';
import { SuccessService } from 'src/app/common/services/success.service';
import { ContentRecords } from 'src/app/models/content-record';
import { QuestionRecords } from 'src/app/models/q-record';
import { HseService } from 'src/app/services/hse.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  public qrecords: QuestionRecords[] | any;
  public deleteqrecords: QuestionRecords| any;
  public updateqrecords: QuestionRecords| any;
  public id: number | any;
  public contentRecords: ContentRecords | any;

  constructor(private hseService: HseService, private ngxSpinner: NgxSpinnerService, private errorService: ErrorService , private successService : SuccessService,  private route: ActivatedRoute,
    private router: Router,) { }

  async ngOnInit() {

    this.getqRecords();
    this.getContenRecords()

  }

  // Add Question Function

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
    this.router.navigate(['/admin/course-edit',id]);
    // this.router.navigate(['/admin/course-edit',id]);
  }


  // Update Question Fuction

  public onUpdateqRecords(qrecord: QuestionRecords): void {
    qrecord.answer1 = qrecord.answer1 ? qrecord.choice1 : undefined
    qrecord.answer2 = qrecord.answer2 ? qrecord.choice2 : undefined
    qrecord.answer3 = qrecord.answer3 ? qrecord.choice3 : undefined
    qrecord.answer4 = qrecord.answer4 ? qrecord.choice4 : undefined
    this.hseService.updateQuestionRecord(qrecord).subscribe(
      (response: QuestionRecords) => {
        this.successService.openDialog("Changes Saved Succesfully")
        // this.router.navigate(['/admin/course-conf']);
        this.getqRecords()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  // Delete Question Function

  public onDeleteqRecords(id: number): void {
    this.hseService.deleteQuestionRecord(id).subscribe(
      (response: void) => {
        console.log(response);
        this.successService.openDialog("Question Deleted Succesfully")
        this.getqRecords();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  // Search Question Function

  public searchqRecords( key : string ):void{

    const results : QuestionRecords[] = [];

    for (const qrecord of this.qrecords){
      if (qrecord.question.toLowerCase().indexOf( key.toLowerCase()) !== -1 
      || qrecord.choice1.toLowerCase().indexOf( key.toLowerCase()) !== -1 
      || qrecord.choice2.toLowerCase().indexOf( key.toLowerCase()) !== -1  
      || qrecord.choice3.toLowerCase().indexOf( key.toLowerCase()) !== -1
      || qrecord.choice4.toLowerCase().indexOf( key.toLowerCase()) !== -1) {
        results.push(qrecord);
      };
    }
    this.qrecords = results; 
    if (results.length === 0 || !key) {
      this.getqRecords();
    }
  }

  // Modal Logic

  public onOpenModal(mode: string, qrecord?:QuestionRecords): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'modal')
    if (mode === 'delete') {
      this.deleteqrecords = qrecord;
      button.setAttribute('data-bs-target', '#deleteQuestionRecordsModal')
    }
    if (mode === 'update') {
      this.updateqrecords = qrecord;
      button.setAttribute('data-bs-target', '#updateQuestionRecordsModal')
    }

    container?.appendChild(button)
    button.click()
  }


}
