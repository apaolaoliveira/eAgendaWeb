import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsService } from './services/contacts.service';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { DeleteContactComponent } from './delete-contact/delete-contact.component';
import { CardContactsComponent } from './card-contacts/card-contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import 'src/app/extensions/form-group.extensions';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AddContactComponent,
    ListContactsComponent,
    EditContactComponent,
    DeleteContactComponent,
    CardContactsComponent
  ],
  imports: [
    CommonModule, 
    NgbModule,
    ReactiveFormsModule,
    ContactsRoutingModule
  ],
  providers: [
    ContactsService
  ]
})
export class ContactsModule { }
