import { Component, OnInit } from '@angular/core';
import { TaskDetails, Task_Status } from '../models/task';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTask, updateTaskStatus } from '../store/kanban.actions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  public taskList: Array<TaskDetails> = [];
  private taskList$: Observable<Array<TaskDetails>>
  public Task_Status = Task_Status;
  public readonly taskBoardList = [
    { title: 'To Do', id: Task_Status.TO_DO },
    { title: 'Implementing', id: Task_Status.IMPLEMENTING },
    { title: 'Done', id: Task_Status.DONE }
  ];

  constructor(
    public dialog: MatDialog,
    public store: Store<{ kanban: Array<TaskDetails> }>,
  ) { 
    this.taskList$ = store.select('kanban');
  }

  ngOnInit(): void {
    this.setTaskList();
  }

  setTaskList(): void {
    this.taskList$.subscribe((tasks) => {
      this.taskList = tasks;
    });
  }

  addTask(): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: {} as TaskDetails
    });
    dialogRef.afterClosed().subscribe((result: TaskDetails) => {
      if (result) {
        result.id = uuidv4();
        result.status = Task_Status.TO_DO;
        this.store.dispatch(addTask(result));
      }
    });
  }

  updateTaskStatus(event: CdkDragDrop<TaskDetails>, item: TaskDetails): void {
    console.log(event, JSON.stringify(item));
    if (item.status === Task_Status.TO_DO) {
      if (event.distance.x > (event.item.element.nativeElement.scrollWidth *2)) {
        this.store.dispatch(updateTaskStatus({task: item, status: Task_Status.DONE}));
      } else {
        this.store.dispatch(updateTaskStatus({task: item, status: Task_Status.IMPLEMENTING}));
      }
    } else if (item.status === Task_Status.DONE) {
      if (Math.abs(event.distance.x) > (event.item.element.nativeElement.scrollWidth *2)) {
        this.store.dispatch(updateTaskStatus({task: item, status: Task_Status.TO_DO}));
      } else {
        this.store.dispatch(updateTaskStatus({task: item, status: Task_Status.IMPLEMENTING}));
      }
    } else if (item.status === Task_Status.IMPLEMENTING) {
      if (event.distance.x > 0) {
        this.store.dispatch(updateTaskStatus({task: item, status: Task_Status.DONE}));
      } else {
        this.store.dispatch(updateTaskStatus({task: item, status: Task_Status.TO_DO}));
      }
    }
  }

}
