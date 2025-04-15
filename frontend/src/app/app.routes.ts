import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('../main-page/main-page.component').then((m) => m.MainPageComponent) },
  { path: 'salaries', loadComponent: () => import('../salaries/main-salaries-component/main-salaries-component.component').then((m) => m.MainSalariesComponentComponent) },
  {path: 'employees', loadComponent: () => import('../employees/main-employee-component/main-employee-component.component').then((m) => m.MainEmployeeComponentComponent)},
];
