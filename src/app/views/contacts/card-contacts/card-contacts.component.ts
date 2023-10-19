import { Component, Input } from '@angular/core';
import { ListContactViewModel } from '../models/list-contact.view-model';

@Component({
  selector: 'app-card-contacts',
  templateUrl: './card-contacts.component.html'
})
export class CardContactsComponent {
  @Input({ required: true }) contact!: ListContactViewModel;
  @Input({ required: true }) isListScreen: boolean = true;
}
