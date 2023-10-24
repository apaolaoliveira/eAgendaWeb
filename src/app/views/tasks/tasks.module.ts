import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { CardTasksComponent } from './card-tasks/card-tasks.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksService } from './services/tasks.service';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AddTaskComponent,
    DeleteTaskComponent,
    EditTaskComponent,
    ListTasksComponent,
    CardTasksComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    NgSelectModule
  ],
  providers: [
    TasksService
  ]
})
export class TasksModule { }
