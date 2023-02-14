import { createReducer, on } from '@ngrx/store';
import { addTask, deleteTask, updateTaskData, updateTaskStatus } from './kanban.actions';
import { TaskDetails } from '../models/task';
import { immerOn } from 'ngrx-immer/store';

export const initialState: Array<TaskDetails> = [];

export const kanbanReducer = createReducer(
  initialState,
  on(addTask, (state, task) => 
    (state.concat(task))
  ),
  immerOn(updateTaskStatus, (state, action) => {
    state.map(t => { 
      t.id === action.task.id ? t.status = action.status : t 
    });
  }),
  immerOn(deleteTask, (state, task) => {
    state.forEach((t, index) => {
      if (task.id === t.id) {
        state.splice(index, 1);
      }
    });
  }),
  immerOn(updateTaskData, (state, task) => {
    state.map(t => { 
      if (task.id === t.id) {
        t.description = task.description;
        t.title = task.title;
      }
    });
  })
);  