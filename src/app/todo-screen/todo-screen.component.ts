import { Component } from '@angular/core';
import { Task } from '../task/task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from '../task-dialog/task-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-todo-screen',
  templateUrl: './todo-screen.component.html',
  styleUrls: ['./todo-screen.component.scss']
})
export class TodoScreenComponent {
  constructor(private dialog: MatDialog, private store: AngularFirestore) {}

  todo = this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  inProgress = this.store.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  done = this.store.collection('done').valueChanges({ idField: 'id' }) as Observable<Task[]>;

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection(list).doc(task.id).delete();
      } else {
        this.store.collection(list).doc(task.id).update(task);
      }
    });
  }

  drop(event: CdkDragDrop<Observable<Task[]>>): void {
    if (event.previousContainer === event.container) {
      return;
    }

    let previousContainer: Task[];
    let container: Task[];

    const updateData = () => {
      if (previousContainer && previousContainer.length && container) {
        const prevItem = previousContainer[event.previousIndex];

        this.store.firestore.runTransaction(() => {
          return Promise.all([
            this.store.collection(event.previousContainer.id).doc(prevItem.id).delete(),
            this.store.collection(event.container.id).add(prevItem),
          ]);
        });
        transferArrayItem(
          previousContainer,
          container,
          event.previousIndex,
          event.currentIndex
        );
      }
    }

    event.previousContainer.data.pipe(take(1)).subscribe((data) => {
      previousContainer = data;
      updateData();
    });

    event.container.data.pipe(take(1)).subscribe((data) => {
      container = data;
      updateData();
    });
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.store.collection('todo').add(result.task);
      });
  }
}
