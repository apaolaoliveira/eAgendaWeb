import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { ListContactViewModel } from '../models/list-contact.view-model';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit{
  contacts: ListContactViewModel[] = [];

  constructor(
    private contactService: ContactsService
  ){}

  ngOnInit(): void {
    this.contactService.getAll().subscribe((res) => {
      this.contacts = res;
    });
  }
}
