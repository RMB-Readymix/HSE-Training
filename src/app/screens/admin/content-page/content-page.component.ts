import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HseService } from 'src/app/services/hse.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentRecords } from 'src/app/models/content-record';
import { ErrorService } from 'src/app/common/services/error.service';
import { SuccessService } from 'src/app/common/services/success.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css'],
})
export class ContentPageComponent implements OnInit {
  public Editor = ClassicEditor;

  public contentRecords: ContentRecords | undefined;

  public titleValue: any;
  public descriptionValue: any;
  public headerImageValue: any;
  public editorValue: any;

  public images: File[] = [];
  public files: File[] = [];
  public videos: File[] = [];
  public header?: Blob;


  
  getTitleValue(val: string) {
    this.titleValue = val;
  }
  getDescriptionValue(val: string) {
    this.descriptionValue = val;
  }
  getHeaderImageValue(val: string) {
    console.log();
    this.headerImageValue = val;
  }
  getEditorValue(val: string) {
    console.log();
    this.editorValue = val;
  }

  constructor(
    private fb: FormBuilder,
    private hseService: HseService,
    private successService: SuccessService,
    private errorService: ErrorService,
    private ngxSpinner: NgxSpinnerService
  ) {}

  get newKeyValueFG(): FormGroup {
    return new FormGroup({
      value: this.fb.control(null),
    });
  }

  imageFA = new FormArray([this.newKeyValueFG]);
  videoFA = new FormArray([this.newKeyValueFG]);
  fileFA = new FormArray([this.newKeyValueFG]);
  headerimageFA = new FormArray([this.newKeyValueFG]);
  propertyFG = new FormGroup({
    title: this.fb.control(null),
    description: this.fb.control(null),
    editor: this.fb.control(null),
    youtube_url : this.fb.control(null),
    image: this.imageFA,
    video: this.videoFA,
    file: this.fileFA,
    headerimage: this.headerimageFA,
  });

  get headerImageArrayFGControls(): FormGroup[] {
    return this.headerimageFA.controls as FormGroup[];
  }

  addNewHederImageFG(): void {
    this.headerimageFA.push(this.newKeyValueFG);
  }

  removeHeaderImageFG(index: number): void {
    this.headerimageFA.removeAt(index);
  }

  get imageArrayFGControls(): FormGroup[] {
    return this.imageFA.controls as FormGroup[];
  }

  addNewImageFG(): void {
    this.imageFA.push(this.newKeyValueFG);
  }

  removeImageFG(index: number): void {
    this.imageFA.removeAt(index);
  }

  get videoArrayFGControls(): FormGroup[] {
    return this.videoFA.controls as FormGroup[];
  }

  addNewVideoFG(): void {
    this.videoFA.push(this.newKeyValueFG);
  }

  removeVideoFG(index: number): void {
    this.videoFA.removeAt(index);
  }

  get fileArrayFGControls(): FormGroup[] {
    return this.fileFA.controls as FormGroup[];
  }

  addNewFileFG(): void {
    this.fileFA.push(this.newKeyValueFG);
  }

  removeFileFG(index: number): void {
    this.fileFA.removeAt(index);
  }

  onImageChange(event: any) {
    this.images = event.target.files;
  }
  onFileChange(event: any) {
    this.files = event.target.files;
  }
  onVideoChange(event: any) {
    this.videos = event.target.files;
  }
  onHeaderChange(event: any) {
    this.header = event.target.files[0];
  }

  onSubmit(): void {
    this.ngxSpinner.show();
    const data = new FormData();
    const formValues = this.propertyFG.value;
    Array.from(this.files).forEach((file) => data.append('file', file));
    Array.from(this.images).forEach((image) => data.append('image', image));
    Array.from(this.videos).forEach((video) => data.append('video', video));
    if (this.header)
    data.append('headerimage' , this.header)
    data.append(
      'content',
      JSON.stringify({
        title: formValues.title,
        description: formValues.description,
        editor: formValues.editor,
        youtube_url:formValues.youtube_url,
      })
    );
    this.hseService.setContentRecord(data).subscribe(
      (response) => {
        this.ngxSpinner.show();
        this.successService.openDialog('Content Created Succesfully');
        this.ngxSpinner.hide();
        this.propertyFG.reset()
      },
      (error: HttpErrorResponse) => {
        this.ngxSpinner.hide();
        this.errorService.openErrorDialog(error);
      }
    );
  }

  ngOnInit(): void {}
}
