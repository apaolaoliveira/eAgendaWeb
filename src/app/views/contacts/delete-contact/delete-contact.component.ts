import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListContactViewModel } from '../models/list-contact.view-model';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css']
})
export class DeleteContactComponent implements OnInit{
  contactVM: ListContactViewModel;

  constructor(
    private contactService: ContactsService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.contactVM = new ListContactViewModel('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data['contact'])).subscribe({
      next: (contacts) => this.getContacts(contacts),
      error: (err) => this.processFailure(err)
    });
  }

  save(){
    this.contactService.delete(this.contactVM.id).subscribe({
      next: () => this.processSuccess(),
      error: (err) => this.processFailure(err)
    });
  }
  
  getContacts(contacts: any): void {
    this.contactVM = contacts;
  }
  
  processSuccess(){
    this.toast.success('The contact was deleted.', 'Success!');
    this.router.navigate(['/contacts/list']);
  }
  
  processFailure(err: Error): void {
    this.toast.error(err.message, 'Erro!');
  }
}
