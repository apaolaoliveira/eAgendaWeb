import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsService } from './services/contacts.service';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AddContactComponent,
    ListContactsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    ContactsService
  ]
})
export class ContactsModule { }
