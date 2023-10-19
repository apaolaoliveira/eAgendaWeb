import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { ListContactViewModel } from '../models/list-contact.view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html'
})
export class ListContactsComponent implements OnInit{
  contacts: ListContactViewModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private toast: ToastrService
  ){}

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data['contact'])).subscribe({
      next: (contacts) => this.getContacts(contacts),
      error: (err) => this.processFailure(err)
    });
  }

  getContacts(contacts: ListContactViewModel[]){
    this.contacts = contacts;
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
