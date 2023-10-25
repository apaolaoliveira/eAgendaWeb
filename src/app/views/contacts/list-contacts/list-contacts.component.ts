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
  selectedFilter: string = '';

  constructor(
    private route: ActivatedRoute,
    private toast: ToastrService
  ){}

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data['contacts'])).subscribe({
      next: (contacts) => this.getContacts(contacts),
      error: (err: Error) => this.processFailure(err)
    });

    this.selectedFilter = 'all';
  }

  getContacts(contacts: ListContactViewModel[]){
    this.contacts = contacts;
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }

  filterContacts() {
    if (this.selectedFilter === 'all')  return this.contacts;
    
    else if (this.selectedFilter === 'favorites') 
      return this.contacts.filter(contact => contact.favorito);

    return null;
  }
}
