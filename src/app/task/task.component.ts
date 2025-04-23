
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], // Adicionando RouterModule aqui
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task!: { text: string; completed: boolean; date?: string; category?: string };
  @Input() index!: number;
  @Input() editIndex!: number | null;
  @Input() showDateInput: boolean[] = [];

  @Output() edit = new EventEmitter<number>();
  @Output() save = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() complete = new EventEmitter<number>();
  @Output() addDate = new EventEmitter<{ task: any; date: string }>();
  @Output() toggleDateInput = new EventEmitter<number>();
  @Output() addCategory = new EventEmitter<{ index: number; category: string }>();

  editTaskValue = '';
  editTaskDate = '';

  isExpired(date: string): boolean {
    const today = new Date();
    const taskDate = new Date(date);
    today.setHours(0, 0, 0, 0);
    return taskDate < today;
  }

  isCategoryAdded = false;
  selectedCategory: string = '';

  predefinedCategories = ['Trabalho', 'Casa', 'Estudo', 'Saúde', 'Outros'];

  onConfirmCategory() {
    if (this.selectedCategory) {
      this.task.category = this.selectedCategory;
      this.addCategory.emit({ index: this.index, category: this.selectedCategory });
      this.isCategoryAdded = true;
    }
  }
}