import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../contacts/services/contacts.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListContactViewModel } from '../../contacts/models/list-contact.view-model';
import { FormAppointmentViewModel } from '../models/form-appointment.view-model';
import { AppointmentsService } from '../services/appointments.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit{
  form!: FormGroup;
  appointmentVM!: FormAppointmentViewModel;

  contacts: ListContactViewModel[] = [];

  constructor(
    private contactService: ContactsService,
    private appointmentService: AppointmentsService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      assunto: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tipoLocal: new FormControl(0, [Validators.required]),
      link: new FormControl(''),
      local: new FormControl(''),
      data: new FormControl(new Date, [Validators.required]),
      horaInicio: new FormControl('00:00', [Validators.required]),
      horaTermino: new FormControl('00:00', [Validators.required]),
      contatoId: new FormControl('')
    });

    this.contactService.getAll().subscribe((contacts) =>{
      this.contacts = contacts;
    });

    this.route.data.pipe(map((data) => data['appointment'])).subscribe({
      next: (appointments) => this.getAppointments(appointments),
      error: (err) => this.processFailure(err)
    });
  }

  validateField(name: string){
    return this.form.get(name)!.touched && this.form.get(name)!.invalid;
  }

  save(){
    if (this.form.invalid) {
      for(let error of this.form.validate()) this.toast.warning(error);
      return;
    }

    this.appointmentVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id');

    if(!id) return;

    this.appointmentService.edit(id, this.appointmentVM).subscribe({
      next: (appointment: FormAppointmentViewModel) => this.processSuccess(appointment),
      error: (err: Error) => this.processFailure(err)
    });
  }

  getAppointments(appointments: FormAppointmentViewModel){
    this.appointmentVM = appointments;
    this.form.patchValue(this.appointmentVM);
  }

  processSuccess(appointment: FormAppointmentViewModel){
    this.toast.success(`${appointment.assunto}'s info was edited.`, 'Success!');
    this.router.navigate(['/appointments/list']);
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
