import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ListTaskViewModel } from '../models/list-task.view-model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html'
})
export class DeleteTaskComponent implements OnInit{
  taskVM!: ListTaskViewModel;

  constructor(
    private taskService: TasksService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data['tasks'])).subscribe({
      next: (tasks: ListTaskViewModel) => this.getAppointments(tasks),
      error: (err: Error) => this.processFailure(err)
    });
  }

  save(){
    this.taskService.delete(this.taskVM.id).subscribe({
      next: () => this.processSuccess(),
      error: (err: Error) => this.processFailure(err)
    });
  }
  
  getAppointments(tasks: ListTaskViewModel): void {
    this.taskVM = tasks;
  }
  
  processSuccess(){
    this.toast.success('The task was deleted.', 'Success!');
    this.router.navigate(['/tasks/list']);
  }
  
  processFailure(err: Error): void {
    this.toast.error(err.message, 'Error!');
  }
}
