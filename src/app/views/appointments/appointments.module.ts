import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { DeleteAppointmentComponent } from './delete-appointment/delete-appointment.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { ListAppointmentComponent } from './list-appointment/list-appointment.component';



@NgModule({
  declarations: [
    AddAppointmentComponent,
    DeleteAppointmentComponent,
    EditAppointmentComponent,
    ListAppointmentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppointmentsModule { }
