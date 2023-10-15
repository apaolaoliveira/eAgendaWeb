import { Component, OnInit } from '@angular/core';
import { ViewContactViewModel } from '../models/view-contact.view-model';
import { ContactsService } from '../services/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css']
})
export class DeleteContactComponent implements OnInit{
  contactVM: ViewContactViewModel;
  selectedId: string | null = null;

  constructor(
    private contactService: ContactsService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.contactVM = new ViewContactViewModel('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.selectedId = this.route.snapshot.paramMap.get('id');

    if(!this.selectedId) return;

    this.contactService.selectFullContactById(this.selectedId).subscribe((res) => {
      this.contactVM = res;
    })
  }

  save(){
    this.contactService.delete(this.selectedId!).subscribe((res) => {
      this.router.navigate(['/contacts/list']);
    });
  }
}
