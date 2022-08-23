import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { routes,AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainingComponent } from './screens/user/training/training.component';
import { QuestionsComponent } from './screens/user/questions/questions.component';
import { ScoreComponent } from './screens/user/score/score.component';
import { AdminComponent } from './screens/admin/admin.component';
import { LoginComponent } from './screens/login/login.component';
import { UserConfigComponent } from './screens/admin/user-config/user-config.component';
import { ErrorMessageComponent } from './common/material/error-message/error-message.component';
import { DialogMaterialComponent } from './common/material/dialog-material/dialog-material.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './screens/error-page/error-page.component';
import { EditUserComponent } from './screens/admin/edit-user/edit-user.component';
import { DashboardComponent } from './screens/admin/dashboard/dashboard.component';
import { CourseConfComponent } from './screens/admin/course-conf/course-conf.component';
import { CourseDetailComponent } from './screens/admin/course-detail/course-detail.component';
import { CourseEditComponent } from './screens/admin/course-edit/course-edit.component';
import { ContentPageComponent } from './screens/admin/content-page/content-page.component';
import { TaskConfComponent } from './screens/admin/task-conf/task-conf.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndTrainingComponent } from './screens/admin/ind-training/ind-training.component';
import { GrpTrainingComponent } from './screens/admin/grp-training/grp-training.component';
import { ContentPreviewComponent } from './screens/admin/content-preview/content-preview.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserComponent } from './screens/user/user.component';
import { CourseComponent } from './screens/user/course/course.component';
import { ProfileComponent } from './screens/user/profile/profile.component';
import { InstructionsComponent } from './screens/user/instructions/instructions.component';
import { UserDashboardComponent } from './screens/user/user-dashboard/user-dashboard.component';
import { IndInfoComponent } from './screens/admin/ind-info/ind-info.component';
import { AssessmentInfoComponent } from './screens/admin/assessment-info/assessment-info.component';



@NgModule({
  declarations: [
    AppComponent,
    // routingComponents,
    TrainingComponent,
    QuestionsComponent,
    ScoreComponent,
    AdminComponent,
    LoginComponent,
    UserConfigComponent,
    ErrorMessageComponent,
    DialogMaterialComponent,
    ErrorPageComponent,
    EditUserComponent,
    DashboardComponent,
    CourseConfComponent,
    CourseDetailComponent,
    CourseEditComponent,
    ContentPageComponent,
    TaskConfComponent,
    IndTrainingComponent,
    GrpTrainingComponent,
    ContentPreviewComponent,
    UserComponent,
    CourseComponent,
    ProfileComponent,
    InstructionsComponent,
    UserDashboardComponent,
    IndInfoComponent,
    AssessmentInfoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CKEditorModule,
    FormsModule,
    NgxDocViewerModule,
    PdfViewerModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
