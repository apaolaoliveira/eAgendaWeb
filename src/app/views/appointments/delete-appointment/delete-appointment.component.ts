import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListAppointmentViewModel } from '../models/list-appointment.view-module';
import { AppointmentsService } from '../services/appointments.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-delete-appointment',
  templateUrl: './delete-appointment.component.html',
  styleUrls: ['./delete-appointment.component.css']
})
export class DeleteAppointmentComponent implements OnInit{
  appointmentVM!: ListAppointmentViewModel;

  constructor(
    private appointmentService: AppointmentsService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data['appointment'])).subscribe({
      next: (appointments) => this.getAppointments(appointments),
      error: (err) => this.processFailure(err)
    });
  }

  save(){
    this.appointmentService.delete(this.appointmentVM.id).subscribe({
      next: () => this.processSuccess(),
      error: (err) => this.processFailure(err)
    });
  }
  
  getAppointments(appointments: any): void {
    this.appointmentVM = appointments;
  }
  
  processSuccess(){
    this.toast.success('The appointment was deleted.', 'Success!');
    this.router.navigate(['/appointments/list']);
  }
  
  processFailure(err: Error): void {
    this.toast.error(err.message, 'Erro!');
  }
}
