import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { DeleteAppointmentComponent } from './delete-appointment/delete-appointment.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { ListAppointmentComponent } from './list-appointment/list-appointment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactsModule } from '../contacts/contacts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentsService } from './services/appointments.service';
import { CardAppointmentsComponent } from './card-appointments/card-appointments.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';

@NgModule({
  declarations: [
    AddAppointmentComponent,
    DeleteAppointmentComponent,
    EditAppointmentComponent,
    ListAppointmentComponent,
    CardAppointmentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    AppointmentsRoutingModule,
    ContactsModule,
  ],
  providers: [
    AppointmentsService
  ]
})
export class AppointmentsModule { }
