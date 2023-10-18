import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { ListContactViewModel } from '../models/list-contact.view-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit{
  contacts: ListContactViewModel[] = [];

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.contacts = this.route.snapshot.data['contact'];
  }
}
