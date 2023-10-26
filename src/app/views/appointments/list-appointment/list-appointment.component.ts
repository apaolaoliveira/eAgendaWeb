import { Component, OnInit } from '@angular/core';
import { ListAppointmentViewModel } from '../models/list-appointment.view-module';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AppointmentsService } from '../services/appointments.service';

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.css']
})
export class ListAppointmentComponent implements OnInit{
  appointments: ListAppointmentViewModel[] = [];
  selectedFilter: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private toast: ToastrService,
    private appointmentService: AppointmentsService
  ){}

  toggleFilter(filter: string){
    this.selectedFilter = filter;
    
    console.log(this.selectedFilter)
  }

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data['appointments'])).subscribe({
      next: (appointments) => this.getAppointments(appointments),
      error: (err) => this.processFailure(err)
    });

    this.selectedFilter = 'all';
  }
  
  getAllAppointments(){
    this.selectedFilter = 'all';
    return this.appointments;
  }
  
  pastFilter(){
    this.selectedFilter = 'past';
    this.appointmentService.pastFilter().subscribe((res) => this.appointments = res);    
  }
  
  presentFilter(){
    this.selectedFilter = 'present';
    this.appointmentService.presentFilter().subscribe((res) => this.appointments = res);    
  }
  
  futureFilter(){
    this.selectedFilter = 'future';
    this.appointmentService.futureFilter(this.startDate, this.endDate).subscribe((res) => this.appointments = res);    
  }

  getAppointments(appointments: ListAppointmentViewModel[]){
    this.appointments = appointments;
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
