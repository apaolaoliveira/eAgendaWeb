import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormContactViewModel } from '../models/form-contact.view-model';
import { ContactsService } from '../services/contacts.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html'
})
export class EditContactComponent implements OnInit{
  form!: FormGroup;
  contactVM!: FormContactViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactsService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required])
    });

    this.route.data.pipe(map((data) => data['contacts'])).subscribe({
      next: (contacts) => this.getContacts(contacts),
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

    this.contactVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id');

    if(!id) return;

    this.contactService.edit(id ,this.contactVM).subscribe({
      next: (contact: FormContactViewModel) => this.processSuccess(contact),
      error: (err: Error) => this.processFailure(err)     
    });
  }

  getContacts(contacts: FormContactViewModel){
    this.contactVM = contacts;
    this.form.patchValue(this.contactVM);
  }

  processSuccess(contact: FormContactViewModel){
    this.toast.success(`${contact.nome}'s info was edited.`, 'Success!');
    this.router.navigate(['/contacts/list']);
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
