import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from 'src/app/common/services/error.service';
import { ContentRecords } from 'src/app/models/content-record';
import { HseService } from 'src/app/services/hse.service';
import { GlobalVariables } from 'src/app/common/common-variables';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SuccessService } from 'src/app/common/services/success.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.css'],
})
export class ContentPreviewComponent implements OnInit {
  public id: number | any;
  public contentRecords: ContentRecords | any;
  public filteredContent: ContentRecords | any;
  public backendUrl = GlobalVariables.backendUrl;
  public doc: any;
  public deleteContnetRecords: ContentRecords | any;
  public updateContnetRecords: ContentRecords | any;

  public Editor = ClassicEditor;

  public images: File[] = [];
  public files: File[] = [];
  public videos: File[] = [];
  public header?: Blob;

  constructor(
    private fb: FormBuilder,
    private ngxSpinner: NgxSpinnerService,
    private errorService: ErrorService,
    private hseService: HseService,
    private route: ActivatedRoute,
    private router: Router,
    private successService: SuccessService
  ) {}

  ngOnInit() {
    this.getContenRecords();
    console.log(this.backendUrl);
  }

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

  // Get Content Record Based on ID

  getContenRecords() {
    this.id = this.route.snapshot.params['id'];
    this.hseService.geContnetRecordById(this.id).subscribe((data) => {
      this.contentRecords = data;
      this.filteredContent = data.docs.filter(
        (doc) =>
          (doc.fileType == 'image/jpeg' || doc.fileType == 'image/png') &&
          doc.fileName !== 'headerimage.jpg'
      );
      console.log('ceh', data.docs, this.filteredContent)
    });
  }

  getContentRecordDetails(id: number) {
    this.router.navigate(['/admin/course-detail', id]);
  }

  // Delete Content Record

  public onDeleteContentRecord(id: number): void {
    this.hseService.deleteContentRecord(id).subscribe(
      (response: void) => {
        this.successService.openDialog('Content Deleted Succesfully');
        this.router.navigate(['/admin/course-conf']);
      },
      (error: HttpErrorResponse) => {
        this.errorService.openErrorDialog(HttpErrorResponse);
      }
    );
  }

  // Update Contnet Record
  public UpdateContentRecords(contentRecords: ContentRecords): void {
    this.ngxSpinner.show();
    this.hseService.updateContentRecord(contentRecords).subscribe(
      (response: ContentRecords) => {
        this.getContenRecords();
        this.successService.openDialog('Changes Saved Successfully');
        this.ngxSpinner.hide();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateContentRecords(): void {
    const data = new FormData();
    const formValues = this.propertyFG.value;
    Array.from(this.files).forEach((file) => data.append('file', file));
    Array.from(this.images).forEach((image) => data.append('image', image));
    Array.from(this.videos).forEach((video) => data.append('video', video));
    if (this.header) data.append('headerimage', this.header);
    data.append(
      'content',
      JSON.stringify({
        title: formValues.title,
        description: formValues.description,
        editor: formValues.editor,
      })
    );
    this.hseService.editContentRecord(data).subscribe(
      (response: ContentRecords) => {
        this.successService.openDialog('Content Updated Succesfully');
      },
      (error: HttpErrorResponse) => {
        this.ngxSpinner.hide();
        this.errorService.openErrorDialog(error);
      }
    );
  }

  // Modal Logic

  public onOpenModal(mode: string, contentRecords?: ContentRecords): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteContnetRecords = contentRecords;
      button.setAttribute('data-bs-target', '#deleteUserRecordsModal');
    }

    if (mode === 'update') {
      this.updateContnetRecords = contentRecords;
      button.setAttribute('data-bs-target', '#updateUserRecordsModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
