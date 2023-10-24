import { Component, Input } from '@angular/core';
import { ListTaskViewModel } from '../models/list-task.view-model';

@Component({
  selector: 'app-card-tasks',
  templateUrl: './card-tasks.component.html'
})
export class CardTasksComponent {
  @Input ({ required: true }) task!: ListTaskViewModel;
  @Input ({ required: true }) isListScreen!: boolean;
}
