import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListTaskViewModel } from '../models/list-task.view-model';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html'
})
export class ListTasksComponent implements OnInit{
  tasks: ListTaskViewModel[] = [];

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.tasks = this.route.snapshot.data['tasks'];
  }
}
