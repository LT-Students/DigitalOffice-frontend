import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../../app-material.module';
import { SharedModule } from '../shared/shared.module';
import { TagsBlockComponent } from './components/tags-block/tags-block.component';
import { DateDescComponent } from './components/date-desc/date-desc.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { DoughnutChartComponent } from './components/chart/doughnut-chart.component';
import { AddHoursComponent } from './components/add-hours/add-hours.component';
import { GradientGraphicsComponent } from './components/gradient-graphics/gradient-graphics.component';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';
import { ProjectComponent } from './components/project/project.component';
import { TaskComponent } from './components/project/task/task.component';

@NgModule({
  declarations: [
    TagsBlockComponent,
    DateDescComponent,
    AttendanceComponent,
    DoughnutChartComponent,
    AddHoursComponent,
    GradientGraphicsComponent,
    UserTasksComponent,
    ProjectComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbDatepickerModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
})
export class UserModule {}
