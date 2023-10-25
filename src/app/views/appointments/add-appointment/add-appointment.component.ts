import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppointmentsService } from '../services/appointments.service';
import { ContactsService } from '../../contacts/services/contacts.service';
import { FormAppointmentViewModel } from '../models/form-appointment.view-model';
import { ListContactViewModel } from '../../contacts/models/list-contact.view-model';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html'
})
export class AddAppointmentComponent implements OnInit{
  form!: FormGroup;

  appointmentVM!: FormAppointmentViewModel;
  contacts: ListContactViewModel[] = [];

  constructor(
    private appointmentService: AppointmentsService,
    private contactService: ContactsService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      assunto: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tipoLocal: new FormControl(0, [Validators.required]),
      link: new FormControl(''),
      local: new FormControl(''),
      data: new FormControl(new Date, [Validators.required]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]),
      contatoId: new FormControl('', [Validators.required])
    });

    this.contactService.getAll().subscribe((contacts) =>{
      this.contacts = contacts;
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

    this.appointmentService.add(this.appointmentVM).subscribe({
      next: (appointment: FormAppointmentViewModel) => this.processSuccess(appointment),
      error: (err: Error) => this.processFailure(err)
    });
  }

  processSuccess(appointment: FormAppointmentViewModel){
    this.toast.success(`${appointment.assunto} was added to your list.`, 'Success!');
    this.router.navigate(['/appointments/list']);
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
