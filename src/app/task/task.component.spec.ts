import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskDetails, Task_Status } from '../models/task';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { of } from 'rxjs';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      imports: [
        StoreModule.forRoot({}),
        MatDialogModule,
        MatTooltipModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('deleteTask', () => {
    it ('should delete task', () => {
      const spy = spyOn(component.store, 'dispatch');
      component.deleteTask();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('editTask', () => {
    it ('should open task modal', () => {
      const task = { id: 'b7aa4d38-44c8-4214-ab9b-41477dac9f6b', title: 'USXXXX', description: 'Feature XX', status: Task_Status.IMPLEMENTING };
      component.task = task;
      const spy = spyOn(component.dialog, 'open').and
      .returnValue({
          afterClosed: () => of(task)
      } as MatDialogRef<TaskModalComponent>);
      component.editTask();
      expect(spy).toHaveBeenCalled();
    });
  });
});
