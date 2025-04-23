import { Component } from '@angular/core';
import { TaskService } from '../task/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  tasksByCategory: { [key: string]: any[] } = {};

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    const tasks = this.taskService.getTasks();

    for (const task of tasks) {
      const cat = task.category || 'Sem categoria';
      if (!this.tasksByCategory[cat]) this.tasksByCategory[cat] = [];
      this.tasksByCategory[cat].push(task);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
  
}
