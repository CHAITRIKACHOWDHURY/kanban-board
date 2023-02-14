import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { TaskComponent } from './task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { kanbanReducer } from './store/kanban.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent,
    TaskComponent,
    TaskModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    StoreModule.forRoot({ kanban: kanbanReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
