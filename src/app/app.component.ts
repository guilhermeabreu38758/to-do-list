import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TaskComponent } from "./task/task.component";
import { TaskService } from './task/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskComponent,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tasks: { text: string; completed: boolean; date: string; category?: string }[] = [];
  newTask = '';
  selectedCategory = '';
  categories = ['Trabalho', 'Casa', 'Estudo', 'Saúde', 'Desporto', 'Outros'];

  editIndex: number | null = null;
  editTaskValue = '';
  editTaskDate = '';
  showDateInput: boolean[] = [];
  showMainLayout = true;

  constructor(private router: Router, private taskService: TaskService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showMainLayout = !event.url.includes('/categories');
      }
    });
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({
        text: this.newTask.trim(),
        completed: false,
        date: '',
        category: '' 
      });
      this.newTask = '';
      this.taskService.setTasks(this.tasks); // garante que as tarefas fiquem disponíveis
    }
  }

  openCategorySelector() {
    const categoria = prompt(`Escolha uma categoria: ${this.categories.join(', ')}`);
    if (categoria && this.categories.includes(categoria)) {
      this.selectedCategory = categoria;
      alert(`Categoria selecionada: ${categoria}`);
    } else {
      alert('Categoria inválida!');
    }
  }

  goToCategoriesPage() {
    this.router.navigate(['/categories']);
  }

  showDateField(index: number) {
    this.showDateInput[index] = true;
  }

  addDate2(task: { text: string; completed: boolean; date: string }, dateValue: string) {
    if (dateValue.trim()) {
      task.date = dateValue;
    }
  }

  getPreviousSiblingValue(event: Event): string {
    const target = event.target as HTMLElement;
    const previousSibling = target?.previousElementSibling as HTMLInputElement | null;
    return previousSibling?.value || '';
  }

  isExpired(date: string): boolean {
    const today = new Date();
    const taskDate = new Date(date);
    today.setHours(0, 0, 0, 0);
    return taskDate < today;
  }

  editTask(index: number) {
    this.editIndex = index;
    this.editTaskValue = this.tasks[index].text;
    this.editTaskDate = this.tasks[index].date;
  }

  saveTask(index: number) {
    if (this.editTaskValue.trim()) {
      this.tasks[index].text = this.editTaskValue.trim();
      this.tasks[index].date = this.editTaskDate.trim();
      this.editIndex = null;
      this.editTaskValue = '';
      this.editTaskDate = '';
    } else {
      alert('Insira uma tarefa válida!');
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.showDateInput.splice(index, 1);
  }

  completeTask(index: number) {
    this.tasks[index].completed = true;
    this.showDateInput[index] = false;
  }

  openCategorySelectorForTask(event: { index: number; category: string }) {
    this.tasks[event.index].category = event.category;
    this.taskService.setTasks(this.tasks); // Salva a nova categoria
  }
}
