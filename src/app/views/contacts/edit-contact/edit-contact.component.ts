import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormContactViewModel } from '../models/form-contact.view-model';
import { ContactsService } from '../services/contacts.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit{
  form!: FormGroup;
  contactVM!: FormContactViewModel;
  selectedId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactsService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl(''),
      cargo: new FormControl(''),
      empresa: new FormControl('')
    });

    this.selectedId = this.route.snapshot.paramMap.get('id');

    if(!this.selectedId) return;

    this.contactService.selectContactById(this.selectedId).subscribe((res) => {
      this.form.setValue(res);
    });
  }

  save(){
    this.contactVM = this.form.value;

    this.contactService.edit(this.selectedId!, this.contactVM).subscribe(res => {
      console.log(res);
      this.router.navigate(['/contacts/list']);
    });
  }
}
