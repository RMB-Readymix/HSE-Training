import { Injectable } from '@angular/core';
import { GlobalVariables } from '../common/common-variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRecords } from '../models/user-record';
import { QuestionRecords } from '../models/q-record';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContentRecords } from '../models/content-record';
import { RmbDepartments } from '../models/rmbDepartments';
import { TaskRecord } from '../models/task-record';
import { MessageTemplate } from '../models/message-template';

@Injectable({
  providedIn: 'root'
})
export class HseService {

  baseBackendUrl: string = GlobalVariables.backendUrl;
  userRecordUrl!: string;
  questionRecordUrl!: string;
  contentRecordUrl!: string;
  rmbDepartmentsUrl!: string;
  taskRecordUrl: string;
  sendingMailNotificationUrl!: string;


  constructor(private httpClient: HttpClient, private dialog: MatDialog, private router: Router) {

    this.userRecordUrl = this.baseBackendUrl + '/userRecord';
    this.questionRecordUrl = this.baseBackendUrl + '/qRecord';
    this.contentRecordUrl = this.baseBackendUrl + '/contentRecord';
    this.rmbDepartmentsUrl = this.baseBackendUrl + '/departments';
    this.taskRecordUrl = this.baseBackendUrl + '/task';
    this.sendingMailNotificationUrl = this.baseBackendUrl + "/sendOutlookMessage";

  }

  // Question Record

  // Add Question Record

  setQuestionRecord(questionRecord: QuestionRecords): Observable<QuestionRecords> {
    return this.httpClient.post<QuestionRecords>(this.questionRecordUrl + "/add", questionRecord)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Get All Question Record

  getQuestionRecord(): Observable<QuestionRecords[]> {
    return this.httpClient.get<QuestionRecords[]>(this.questionRecordUrl + "/getAll")
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Get Question Record By Id

  getQuestionRecordById(id: number): Observable<QuestionRecords[]> {
    return this.httpClient.get<QuestionRecords[]>(this.questionRecordUrl + "/get/" + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  // Delete Question Record

  deleteQuestionRecord(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.questionRecordUrl + "/delete/" + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Update Question Record

  updateQuestionRecord(questionRecord: QuestionRecords): Observable<QuestionRecords> {
    return this.httpClient.put<QuestionRecords>(this.questionRecordUrl + "/update", questionRecord)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // User Record

  // Add User Record

  setUserRecord(userRecord: UserRecords): Observable<UserRecords> {
    return this.httpClient.post<UserRecords>(this.userRecordUrl + "/add", userRecord)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Get User Recor By Email

  getUserRecordByEmail(email: String): Observable<UserRecords> {
    return this.httpClient.get<UserRecords>(this.userRecordUrl + "/" + email)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Update User Record

  updateUserRecord(userRecord: UserRecords): Observable<UserRecords> {
    return this.httpClient.put<UserRecords>(this.userRecordUrl + "/update", userRecord)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  // Get All User Record

  getUserRecord(): Observable<any> {
    return this.httpClient.get((this.userRecordUrl + "/getAll"))
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  // Get User Record By Id

  getUserRecordById(id: number): Observable<UserRecords[]> {
    return this.httpClient.get<UserRecords[]>(this.userRecordUrl + "/get/" + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //Get User Record By Department

  getUserRecordByDepartment(department: string, page: number): Observable<UserRecords[]> {
    if (department === '') {
      return this.httpClient.get<UserRecords[]>(this.userRecordUrl + "s/" + page).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }
    else {
      return this.httpClient.get<UserRecords[]>(this.userRecordUrl + "s/" + page + "/" + department).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }
  }

  // Delete User Record

  deleteUserRecord(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.userRecordUrl + "/delete/" + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  // Content Record

  // Add Content Record

  setContentRecord(contentRecord: any): Observable<ContentRecords> {
    console.log('contentfromservice-',contentRecord)
    return this.httpClient.post<ContentRecords>(this.contentRecordUrl + "/add", contentRecord)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  editContentRecord(contentRecord: any): Observable<ContentRecords> {
    return this.httpClient.patch<ContentRecords>(this.contentRecordUrl + "/edit", contentRecord)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  // Get Contnet Record

  getContentRecord(): Observable<any> {
    return this.httpClient.get((this.contentRecordUrl + "/getAll"))
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  geContnetRecordById(id: number): Observable<ContentRecords> {
    return this.httpClient.get<ContentRecords>(this.contentRecordUrl + "/get/" + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Delete Content Record

  deleteContentRecord(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.contentRecordUrl + "/delete/" + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Update Content Record

  updateContentRecord(contentRecord: ContentRecords): Observable<ContentRecords> {
    return this.httpClient.patch<ContentRecords>(this.contentRecordUrl + "/update", contentRecord)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //RMB Departments

  // Get RMB Departments

  getRmbDepartments(): Observable<RmbDepartments[]> {
    return this.httpClient.get<RmbDepartments[]>(this.rmbDepartmentsUrl + "/getAll")
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  // Task Record

  // Add Task Record

  setTaskRecord(taskRecord: TaskRecord): Observable<TaskRecord> {
    return this.httpClient.post<TaskRecord>(this.taskRecordUrl + "/add", taskRecord)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Get All Question Record

  getTaskRecord(): Observable<TaskRecord[]> {
    return this.httpClient.get<TaskRecord[]>(this.taskRecordUrl + "/getAll")
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Get Question Record By Id

  getTaskRecordById(id: number): Observable<TaskRecord[]> {
    return this.httpClient.get<TaskRecord[]>(this.taskRecordUrl + "/get/" + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  // Delete Question Record

  deleteTaskRecord(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.taskRecordUrl + "/delete/" + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Update Question Record

  updateTaskRecord(taskRecord: TaskRecord): Observable<TaskRecord> {
    return this.httpClient.put<TaskRecord>(this.taskRecordUrl + "/update", taskRecord)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Send Mail Notification

  sendMail(to: String, messageTemplate: MessageTemplate): Observable<MessageTemplate> {
    return this.httpClient.post<MessageTemplate>(this.sendingMailNotificationUrl + "/" + to, messageTemplate)
      .pipe(
        retry(1),
        // catchError(this.handleError)
      );
  }


  // Error Service

  handleError(error: any) {

    this.router.navigateByUrl('/error');

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {

      // client-side error

      errorMessage = `Error Code: CSE` + "\nKindly check your internet connection. If the problem still persists contact IT. \nThank you";

    } else {

      // server-side error

      errorMessage = `Error Code: SSE` + "\nKindly check your internet connection. If the problem still persists contact IT. \nThank you";

    }


    return throwError(errorMessage);

  }
}
