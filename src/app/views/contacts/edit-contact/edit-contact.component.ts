import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required])
    });

    this.selectedId = this.route.snapshot.paramMap.get('id');

    if(!this.selectedId) return;

    this.contactService.selectById(this.selectedId).subscribe((res) => {
      this.form.setValue(res);
    });
  }

  validateField(name: string){
    return this.form.get(name)!.touched && this.form.get(name)!.invalid;
  }

  save(){
    if (this.form.invalid) {
      this.toast.warning("Check your form's info", "Warning!");
      return;
    }

    this.contactVM = this.form.value;

    this.contactService.edit(this.selectedId!, this.contactVM).subscribe(res => {
      console.log(res);
      this.router.navigate(['/contacts/list']);
    });
  }
}
