import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl(''),
      cargo: new FormControl(''),
      empresa: new FormControl('')
    });
  }

  save(){
    this.contactVM = this.form.value;

    this.contactService.add(this.contactVM).subscribe(res => {
      console.log(res);
      this.router.navigate(['/contacts/list']);
    });
  }
}
