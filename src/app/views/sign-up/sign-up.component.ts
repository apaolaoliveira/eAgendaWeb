import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenViewModel } from 'src/app/core/auth/models/token.view-model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmarSenha: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  validateField(name: string){
    return this.form.get(name)!.touched && this.form.get(name)!.invalid;
  }

  signUp(){
    if (this.form.invalid) {
      for(let error of this.form.validate()) this.toast.warning(error);
      return;
    }

    this.authService.signUpUser(this.form.value).subscribe({
      next: (user: TokenViewModel) => this.processSuccess(user),
      error: (err: Error) => this.processFailure(err)
    });
  }

  processSuccess(user: TokenViewModel){
    this.toast.success(`Welcome to e-Agenda ${user.usuarioToken.nome} :)`, 'Success!');
    this.router.navigate(['/dashboard']);
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
