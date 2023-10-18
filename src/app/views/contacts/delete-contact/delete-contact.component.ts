import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListContactViewModel } from '../models/list-contact.view-model';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css']
})
export class DeleteContactComponent implements OnInit{
  contactVM: ListContactViewModel;

  constructor(
    private contactService: ContactsService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.contactVM = new ListContactViewModel('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.contactVM = this.route.snapshot.data['contact'];
  }

  save(){
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.contactService.delete(id).subscribe((res) => {
      this.router.navigate(['/contacts/list']);
    });
  }
}
