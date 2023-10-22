import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-tasks',
  templateUrl: './card-tasks.component.html'
})
export class CardTasksComponent {
  @Input ({ required: true }) task!: string;
  @Input ({ required: true }) isListScreen!: boolean;
}
