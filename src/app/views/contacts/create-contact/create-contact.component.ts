import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ContactsService } from '../services/contacts.service';
import { Router } from '@angular/router';
import { FormContactViewModel } from '../models/form-contact.view-model';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit{
  form!: FormGroup;
  contactVM!: FormContactViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactsService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      position: new FormControl(''),
      company: new FormControl('')
    });
  }

  save(){
    this.contactVM = this.form.value;

    this.contactService.create(this.contactVM).subscribe(res => {
      console.log(res);
      this.router.navigate(['/dashboard']);
    });
  }
}
