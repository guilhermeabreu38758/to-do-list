
import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [
  { path: '', component: TaskComponent },
  {
    path: 'categories',
    loadComponent: () => import('./categories/categories.component').then(m => m.CategoriesComponent)
  }
];