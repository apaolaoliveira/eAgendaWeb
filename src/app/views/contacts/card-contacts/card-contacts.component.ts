import { Component, Input } from '@angular/core';
import { ListContactViewModel } from '../models/list-contact.view-model';
import { ToastrService } from 'ngx-toastr';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-card-contacts',
  templateUrl: './card-contacts.component.html'
})
export class CardContactsComponent {
  @Input({ required: true }) contact!: ListContactViewModel;
  @Input({ required: true }) isListScreen: boolean = true;

  constructor(
    private toast: ToastrService,
    private contactService: ContactsService
  ){}

  toggleFavorite(){
    this.contact.favorito = !this.contact.favorito;

    this.contactService.updateFavorite(this.contact.id).subscribe({
      next: (contact: ListContactViewModel) => this.processSuccess(contact),
      error: (err: Error) => this.processFailure(err)
    });
  }

  processSuccess(contact: ListContactViewModel){
    if (contact.favorito)
      this.toast.success(`${contact.nome} was added to favorites.`, 'Success!');
    else
      this.toast.success(`${contact.nome} was removed from favorites.`, 'Success!');
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
