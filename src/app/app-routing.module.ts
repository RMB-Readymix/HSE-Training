import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootHomeComponent } from './screens/root-home/root-home.component';
import { TrainingComponent } from './screens/user/training/training.component';
import { QuestionsComponent } from './screens/user/questions/questions.component';
import { AdminComponent } from './screens/admin/admin.component';
import { LoginComponent } from './screens/login/login.component';
import { UserConfigComponent } from './screens/admin/user-config/user-config.component';
import { EditUserComponent } from './screens/admin/edit-user/edit-user.component';
import { DashboardComponent } from './screens/admin/dashboard/dashboard.component';
import { CourseConfComponent } from './screens/admin/course-conf/course-conf.component';
import { CourseDetailComponent } from './screens/admin/course-detail/course-detail.component';
import { CourseEditComponent } from './screens/admin/course-edit/course-edit.component';
import { ContentPageComponent } from './screens/admin/content-page/content-page.component';
import { TaskConfComponent } from './screens/admin/task-conf/task-conf.component';
import { IndTrainingComponent } from './screens/admin/ind-training/ind-training.component';
import { GrpTrainingComponent } from './screens/admin/grp-training/grp-training.component';
import { ContentPreviewComponent } from './screens/admin/content-preview/content-preview.component';
import { ErrorMessageComponent } from './common/material/error-message/error-message.component';
import { DialogMaterialComponent } from './common/material/dialog-material/dialog-material.component';
import { UserComponent } from './screens/user/user.component';
import { CourseComponent } from './screens/user/course/course.component';
import { ProfileComponent } from './screens/user/profile/profile.component';
import { AuthguardService } from './services/authguard/authguard.service';
import { InstructionsComponent } from './screens/user/instructions/instructions.component';
import { UserDashboardComponent } from './screens/user/user-dashboard/user-dashboard.component';
import { IndInfoComponent } from './screens/admin/ind-info/ind-info.component';
import { ScoreComponent } from './screens/user/score/score.component';
import { AssessmentInfoComponent } from './screens/admin/assessment-info/assessment-info.component';


export var  routes: Routes = [
  { path: '', component: RootHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user',
    component: UserComponent,
    children:[
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'training', component: TrainingComponent },
      { path: 'training/:id', component: TrainingComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'questions/:id', component: QuestionsComponent },
      { path: 'course', component: CourseComponent },
      { path: 'profile', component:ProfileComponent },
      { path: 'instructions', component:InstructionsComponent },
      { path: 'instructions/:id', component:InstructionsComponent },
      { path: 'score', component:ScoreComponent },
    ], 
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user-config', component: UserConfigComponent },
      { path: 'edit-user', component: EditUserComponent },
      { path: 'course-conf', component: CourseConfComponent },
      { path: 'course-detail', component: CourseDetailComponent },
      { path: 'course-detail/:id', component: CourseDetailComponent },
      { path: 'course-edit', component: CourseEditComponent },
      { path: 'course-edit/:id', component: CourseEditComponent },
      { path: 'content-page', component: ContentPageComponent },
      { path: 'task-conf', component: TaskConfComponent },
      { path: 'ind-training', component: IndTrainingComponent },
      { path: 'grp-training', component: GrpTrainingComponent },
      { path: 'content-preview', component: ContentPreviewComponent },
      { path: 'content-preview/:id', component: ContentPreviewComponent },
      { path: 'ind-info', component: IndInfoComponent },
      { path: 'assessment-info', component: AssessmentInfoComponent },
    ],
  },
  { path: 'error', component: ErrorMessageComponent },
  { path: 'dialog', component: DialogMaterialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


