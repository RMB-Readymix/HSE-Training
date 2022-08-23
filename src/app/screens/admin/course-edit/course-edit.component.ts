import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { HseService } from 'src/app/services/hse.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { ErrorService } from 'src/app/common/services/error.service';
import { SuccessService } from 'src/app/common/services/success.service';
import { QuestionRecords } from 'src/app/models/q-record';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentRecords } from 'src/app/models/content-record';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  public qrecords: QuestionRecords[] | undefined;
  public id: number | any;
  public contentRecords: ContentRecords | any;

  constructor(private fb: FormBuilder, private errorService: ErrorService, private successService: SuccessService, private ngxSpinner: NgxSpinnerService, private hseService: HseService,    private route: ActivatedRoute,
    private router: Router,) { }

  questionnaireForm = this.fb.group({
    alternativeQuestion: this.fb.array([])
  })

  get alternativeQuestion() {
    return this.questionnaireForm.get('alternativeQuestion') as FormArray
  }

  addAlternativeQuestion() {
    this.alternativeQuestion.push(this.fb.control(''))
  }


  removeAlternativeQuestion(index: number): void {
    this.alternativeQuestion.removeAt(index);
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


  ngOnInit(): void {
    this.getContenRecords()
  }

  // Add Question Record

  public addQuestionRecord(addForm: NgForm): void {
    addForm.value.answer1 = addForm.value.answer1 ? addForm.value.choice1 : undefined
    addForm.value.answer2 = addForm.value.answer2 ? addForm.value.choice2 : undefined
    addForm.value.answer3 = addForm.value.answer3 ? addForm.value.choice3 : undefined
    addForm.value.answer4 = addForm.value.answer4 ? addForm.value.choice4 : undefined
    console.log(addForm.value)
    this.hseService.setQuestionRecord(addForm.value).subscribe(
      (response: QuestionRecords) => {
        this.successService.openDialog("Question Created Succesfully")
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.ngxSpinner.hide();
        this.errorService.openErrorDialog(error);
      }
    )
  }


}
