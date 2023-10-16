import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { CardTasksComponent } from './card-tasks/card-tasks.component';



@NgModule({
  declarations: [
    AddTaskComponent,
    DeleteTaskComponent,
    EditTaskComponent,
    ListTaskComponent,
    ListTasksComponent,
    CardTasksComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TasksModule { }
