import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenViewModel } from 'src/app/core/auth/models/token.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  validateField(name: string){
    return this.form.get(name)!.touched && this.form.get(name)!.invalid;
  }

  login(){
    if (this.form.invalid) {
      for(let error of this.form.validate()) this.toast.warning(error);
      return;
    }

    this.authService.login(this.form.value).subscribe({
      next: (user: TokenViewModel) => this.processSuccess(user),
      error: (err: Error) => this.processFailure(err)
    });
  }

  processSuccess(user: TokenViewModel){
    this.toast.success(`Welcome back ${user.usuarioToken.nome} :)`, 'Success!');
    this.router.navigate(['/dashboard']);
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
