import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  selectedTaskIndex: number | null = null;

  setTaskIndex(index: number) {
    this.selectedTaskIndex = index;
  }

  getTaskIndex(): number | null {
    return this.selectedTaskIndex;
  }

  clearTaskIndex() {
    this.selectedTaskIndex = null;
  }
  private tasks: { text: string; completed: boolean; date: string; category?: string; }[] = [];

  setTasks(tasks: any[]) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

}
