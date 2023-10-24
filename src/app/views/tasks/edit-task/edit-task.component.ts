import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormTaskViewModel } from '../models/form-task.view-model';
import { ItemStatusEnum } from '../models/status-item.enum';
import { TaskItemViewModel } from '../models/task-item.view-model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html'
})
export class EditTaskComponent implements OnInit{
  form!: FormGroup;
  itemTitleControl!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: [0, [Validators.required]],
      itens: new FormArray([])
    });

    this.itemTitleControl = this.formBuilder.control('');

    const task = this.route.snapshot.data['tasks'];

    // upload title and priority
    this.form.patchValue(task);

    // upload items on FormArray
    for (let item of task.itens) {
      const itemGroup = this.formBuilder.group({
        id: [item.id],
        titulo: [item.titulo],
        status: [item.status],
        concluido: [item.concluido],
      });

      this.itens.push(itemGroup);
    }
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
      concluido: false
    };

    const newItemGroup = this.formBuilder.group({
      titulo: [item.titulo],
      status: [item.status],
      concluido: [item.concluido]
    });

    this.itens.push(newItemGroup);

    this.itemTitleControl?.reset();
  }

  deleteItem(index: number){
    const group = this.itens.controls.at(index);

    const actualValue = group?.get('status')?.value as ItemStatusEnum;

    const varyValue =
      actualValue == ItemStatusEnum.Removido
        ? ItemStatusEnum.Inalterado
        : ItemStatusEnum.Removido;

    group?.patchValue({ status: varyValue });
  }

  checkItem(index: number){
    const group = this.itens.controls.at(index);

    const actualValue = group?.get('concluido')?.value as boolean;

    const varyValue = !actualValue;

    group?.patchValue({ concluido: varyValue });
  }

  save(){
    if (this.form.invalid) {
      for(let error of this.form.validate()) this.toast.warning(error);
      return;
    }

    const id = this.route.snapshot.paramMap.get('id')!;

    this.taskService.edit(id, this.form.value).subscribe({
      next: (tasks: FormTaskViewModel) => this.processSuccess(tasks),
      error: (err: Error) => this.processFailure(err)
    });
  }

  processSuccess(task: FormTaskViewModel){
    this.toast.success(`${task.titulo}'s info was edited.`, 'Success!');
    this.router.navigate(['/tasks/list']);
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
