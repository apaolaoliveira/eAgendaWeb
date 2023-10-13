import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsService } from './services/contacts.service';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { RouterModule } from '@angular/router';
import { EditContactComponent } from './edit-contact/edit-contact.component';



@NgModule({
  declarations: [
    AddContactComponent,
    ListContactsComponent,
    EditContactComponent
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
