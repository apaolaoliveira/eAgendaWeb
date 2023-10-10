import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsService } from './services/contacts.service';



@NgModule({
  declarations: [
    CreateContactComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    ContactsService
  ]
})
export class ContactsModule { }
