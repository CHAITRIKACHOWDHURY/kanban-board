import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskDetails, Task_Status } from '../models/task';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { of } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
      imports: [
        StoreModule.forRoot({}),
        MatDialogModule,
        MatTooltipModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addTask', () => {
    it ('should open task modal', () => {
      const task = { id: 'b7aa4d38-44c8-4214-ab9b-41477dac9f6b', title: 'USXXXX', description: 'Feature XX', status: Task_Status.TO_DO };
      const spy = spyOn(component.dialog, 'open').and
        .returnValue({
            afterClosed: () => of(task)
        } as MatDialogRef<TaskModalComponent>);
      component.addTask();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('updateTaskStatus', () => {
    it (`should update task status to 'IMPLEMENTION' if Status is 'TO_DO' and scrollWidth is not double`, () => {
      const task = {
         id: 'b7aa4d38-44c8-4214-ab9b-41477dac9f6b', 
         title: 'USXXXX', 
         description: 'Feature XX', 
         status: Task_Status.TO_DO
        };
      const e = { 
        previousIndex: 0, 
        currentIndex: 0,
        isPointerOverContainer: false,
        distance: {x: 10, y: 10},
        dropPoint: {x: 10, y: 10},
        item: {
          element: {
            nativeElement: {
              scrollWidth: 10
            }
          }
        }
      };
      const spy = spyOn(component.store, 'dispatch');
      component.updateTaskStatus(e as  CdkDragDrop<TaskDetails>, task);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it (`should update task status to 'DONE' if Status is 'TO_DO' and scrollWidth is double`, () => {
      const task = {
         id: 'b7aa4d38-44c8-4214-ab9b-41477dac9f6b', 
         title: 'USXXXX', 
         description: 'Feature XX', 
         status: Task_Status.TO_DO
        };
      const e = { 
        previousIndex: 0, 
        currentIndex: 0,
        isPointerOverContainer: false,
        distance: {x: 30, y: 10},
        dropPoint: {x: 10, y: 10},
        item: {
          element: {
            nativeElement: {
              scrollWidth: 10
            }
          }
        }
      };
      const spy = spyOn(component.store, 'dispatch');
      component.updateTaskStatus(e as  CdkDragDrop<TaskDetails>, task);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it (`should update task status to 'IMPLEMENTION' if Status is 'DONE' and scrollWidth is not double`, () => {
      const task = {
         id: 'b7aa4d38-44c8-4214-ab9b-41477dac9f6b', 
         title: 'USXXXX', 
         description: 'Feature XX', 
         status: Task_Status.DONE
        };
      const e = { 
        previousIndex: 0, 
        currentIndex: 0,
        isPointerOverContainer: false,
        distance: {x: -10, y: 10},
        dropPoint: {x: 10, y: 10},
        item: {
          element: {
            nativeElement: {
              scrollWidth: 10
            }
          }
        }
      };
      const spy = spyOn(component.store, 'dispatch');
      component.updateTaskStatus(e as  CdkDragDrop<TaskDetails>, task);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it (`should update task status to 'TO_DO' if Status is 'DONE' and scrollWidth is double`, () => {
      const task = {
         id: 'b7aa4d38-44c8-4214-ab9b-41477dac9f6b', 
         title: 'USXXXX', 
         description: 'Feature XX', 
         status: Task_Status.DONE
        };
      const e = { 
        previousIndex: 0, 
        currentIndex: 0,
        isPointerOverContainer: false,
        distance: {x: -30, y: 10},
        dropPoint: {x: 10, y: 10},
        item: {
          element: {
            nativeElement: {
              scrollWidth: 10
            }
          }
        }
      };
      const spy = spyOn(component.store, 'dispatch');
      component.updateTaskStatus(e as  CdkDragDrop<TaskDetails>, task);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it (`should update task status to 'DONE' if Status is 'IMPLEMENTION' and distance x is positive`, () => {
      const task = {
         id: 'b7aa4d38-44c8-4214-ab9b-41477dac9f6b', 
         title: 'USXXXX', 
         description: 'Feature XX', 
         status: Task_Status.IMPLEMENTING
        };
      const e = { 
        previousIndex: 0, 
        currentIndex: 0,
        isPointerOverContainer: false,
        distance: {x: 10, y: 10},
        dropPoint: {x: 10, y: 10},
        item: {
          element: {
            nativeElement: {
              scrollWidth: 10
            }
          }
        }
      };
      const spy = spyOn(component.store, 'dispatch');
      component.updateTaskStatus(e as  CdkDragDrop<TaskDetails>, task);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it (`should update task status to 'TO_DO' if Status is 'IMPLEMENTING' and distance x is negative`, () => {
      const task = {
         id: 'b7aa4d38-44c8-4214-ab9b-41477dac9f6b', 
         title: 'USXXXX', 
         description: 'Feature XX', 
         status: Task_Status.IMPLEMENTING
        };
      const e = { 
        previousIndex: 0, 
        currentIndex: 0,
        isPointerOverContainer: false,
        distance: {x: -30, y: 10},
        dropPoint: {x: 10, y: 10},
        item: {
          element: {
            nativeElement: {
              scrollWidth: 10
            }
          }
        }
      };
      const spy = spyOn(component.store, 'dispatch');
      component.updateTaskStatus(e as  CdkDragDrop<TaskDetails>, task);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
