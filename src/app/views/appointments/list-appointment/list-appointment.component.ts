import { Component, OnInit } from '@angular/core';
import { ListAppointmentViewModel } from '../models/list-appointment.view-module';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html'
})
export class ListAppointmentComponent implements OnInit{
  appointments: ListAppointmentViewModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private toast: ToastrService
  ){}

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data['appointments'])).subscribe({
      next: (appointments) => this.getAppointments(appointments),
      error: (err) => this.processFailure(err)
    });
  }

  getAppointments(appointments: ListAppointmentViewModel[]){
    this.appointments = appointments;
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
