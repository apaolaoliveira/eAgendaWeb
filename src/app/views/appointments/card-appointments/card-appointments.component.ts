import { Component, Input } from '@angular/core';
import { ListAppointmentViewModel } from '../models/list-appointment.view-module';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-appointments',
  templateUrl: './card-appointments.component.html'
})
export class CardAppointmentsComponent {
  @Input({ required: true }) appointment!: ListAppointmentViewModel;
  @Input({ required: true }) isListScreen: boolean = true;
}
