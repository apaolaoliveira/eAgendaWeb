import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    NgbTooltip,
    NgClass
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
