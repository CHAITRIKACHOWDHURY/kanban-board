import { createAction, props } from '@ngrx/store';
import { TaskDetails, Task_Status } from '../models/task';
 
export const addTask = createAction('[Board Component] Add Task', props<TaskDetails>());
export const deleteTask = createAction('[Task Component] Delete Task', props<TaskDetails>());
export const updateTaskData = createAction('[Task Component] Update Task Data', props<TaskDetails>());
export const updateTaskStatus = createAction('[Board Component] Update Task Status', props<{task: TaskDetails, status: Task_Status}>());