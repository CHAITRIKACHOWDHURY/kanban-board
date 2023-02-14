import { Component, HostBinding, OnInit, Input } from '@angular/core';
import { TaskDetails } from '../models/task';
import { Store } from '@ngrx/store';
import { deleteTask, updateTaskData } from '../store/kanban.actions';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {

  @HostBinding('class.task') styling = true;
  @Input() task: TaskDetails;

  constructor(
    public store: Store<{ kanban: Array<TaskDetails> }>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  deleteTask(): void {
    this.store.dispatch(deleteTask(this.task));
  }

  editTask(): void {
    const newTask = JSON.parse(JSON.stringify(this.task));
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: newTask
    });
    dialogRef.afterClosed().subscribe((result: TaskDetails) => {
      if (result) {
        this.store.dispatch(updateTaskData(result));
      }
    });
  }


}
