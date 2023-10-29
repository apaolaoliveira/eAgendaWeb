import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';
import { LoadingModule } from './loading/loading.module';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    NgbTooltip,
    NgClass,
    AuthModule,
    LoadingModule
  ],
  exports: [
    NavbarComponent,
    AuthModule,
    LoadingModule
  ]
})
export class CoreModule { }
