import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { loginGuard } from 'src/app/core/auth/guards/login.guard';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [loginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
