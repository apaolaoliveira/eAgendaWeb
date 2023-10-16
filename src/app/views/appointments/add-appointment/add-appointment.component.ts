import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    
  }

  validateField(name: string){
    return this.form.get(name)!.touched && this.form.get(name)!.invalid;
  }

  save(){
    if (this.form.invalid) return;

    // this.contactVM = this.form.value;

    // this.contactService.add(this.contactVM).subscribe(res => {
    //   console.log(res);
    //   this.router.navigate(['/contacts/list']);
    // });
  }
}
