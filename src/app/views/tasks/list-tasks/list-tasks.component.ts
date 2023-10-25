import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListTaskViewModel } from '../models/list-task.view-model';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html'
})
export class ListTasksComponent implements OnInit{
  tasks: ListTaskViewModel[] = [];
  selectedFilter: string = '';

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.tasks = this.route.snapshot.data['tasks'];
    this.selectedFilter = 'all';
  }

  filterByConclusion(){
    if(this.selectedFilter == 'all') return this.tasks;
    
    else if (this.selectedFilter == 'done') return this.tasks.filter((task) => task.situacao == 'Concluído');
    
    else return this.tasks.filter((task) => task.situacao == 'Pendente');
  }
}
