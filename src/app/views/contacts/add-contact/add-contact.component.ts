import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from '../services/contacts.service';
import { Router } from '@angular/router';
import { FormContactViewModel } from '../models/form-contact.view-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit{
  form!: FormGroup;
  contactVM!: FormContactViewModel;

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
    if (this.form.invalid) return;

    this.contactVM = this.form.value;

    this.contactService.add(this.contactVM).subscribe(res => {
      console.log(res);
      this.router.navigate(['/contacts/list']);
    });
  }
}
