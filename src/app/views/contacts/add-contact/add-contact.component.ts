import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from '../services/contacts.service';
import { Router } from '@angular/router';
import { FormContactViewModel } from '../models/form-contact.view-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html'
})
export class AddContactComponent implements OnInit{
  form!: FormGroup;
  contactVM!: FormContactViewModel;
  phone: string = ''

  applyPhoneMask(event: any) {
    this.phone = event.target.value.replace(/\D/g, '');

    if (this.phone.length <= 10) {
      this.phone = this.phone.replace(/(\d{2})(\d{0,4})(\d{0,4})/, '($1) $2-$3');
    } else {
      this.phone = this.phone.replace(/(\d{2})(\d{0,5})(\d{0,4})/, '($1) $2-$3');
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactsService,
    private toast: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required])
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

    this.contactVM = this.form.value;

    this.contactService.add(this.contactVM).subscribe({
      next: (contact: FormContactViewModel) => this.processSuccess(contact),
      error: (err: Error) => this.processFailure(err)     
    });
  }

  processSuccess(contact: FormContactViewModel){
    this.toast.success(`${contact.nome} was added to your list.`, 'Success!');
    this.router.navigate(['/contacts/list']);
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
