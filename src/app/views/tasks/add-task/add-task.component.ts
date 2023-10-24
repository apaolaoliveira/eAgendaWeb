import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../services/tasks.service';
import { TaskItemViewModel } from '../models/task-item.view-model';
import { ItemStatusEnum } from '../models/status-item.enum';
import { FormTaskViewModel } from '../models/form-task.view-model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html'
})
export class AddTaskComponent implements OnInit{
  form!: FormGroup;
  itemTitleControl!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    private toast: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: [0, [Validators.required]],
      itens: new FormArray([])
    });

    this.itemTitleControl = this.formBuilder.control('');
  }

  get itens(): FormArray {
    return this.form.get('itens') as FormArray;
  }

  validateField(name: string){
    return this.form.get(name)!.touched && this.form.get(name)!.invalid;
  }

  addItem(){
    const item: TaskItemViewModel = {
      titulo: this.itemTitleControl?.value,
      status: ItemStatusEnum.Adicionado,
      concluido: false,
    };

    const newItemGroup = this.formBuilder.group({
      titulo: [item.titulo],
      status: [item.status],
      concluido: [item.concluido],
    });

    this.itens.push(newItemGroup);

    this.itemTitleControl?.reset();
  }

  deleteItem(index: number){
    this.itens.removeAt(index);
  }

  save(){
    if (this.form.invalid) {
      for(let error of this.form.validate()) this.toast.warning(error);
      return;
    }

    this.taskService.add(this.form.value).subscribe({
      next: (tasks: FormTaskViewModel) => this.processSuccess(tasks),
      error: (err: Error) => this.processFailure(err)
    });
  }

  processSuccess(task: FormTaskViewModel){
    this.toast.success(`${task.titulo} was added to your list.`, 'Success!');
    this.router.navigate(['/tasks/list']);
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
