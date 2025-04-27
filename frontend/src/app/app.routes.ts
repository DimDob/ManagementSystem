import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'main-page', pathMatch: 'full', loadComponent: () => import('../main-page/main-page.component').then((m) => m.MainPageComponent) },
  { path: 'salaries', loadComponent: () => import('../salaries/main-salaries-component/main-salaries-component.component').then((m) => m.MainSalariesComponentComponent) },
  { path: 'employees', loadComponent: () => import('../employees/main-employee-component/main-employee-component.component').then((m) => m.MainEmployeeComponentComponent)},
  {path: 'employees/table', loadComponent: () => import('../employees/table/table.component').then((m) => m.TableComponent)},
  {path: 'auth/login', loadComponent: () => import('./auth/login/login.component').then((m) => m.LoginComponent)},
  {path: 'auth/register', loadComponent: () => import('./auth/register/register.component').then((m) => m.RegisterComponent)},
  {path: 'auth/forgot-password', loadComponent: () => import('./auth/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent)},
  {path: 'auth/change-password', loadComponent: () => import('./auth/change-password/change-password.component').then((m) => m.ChangePasswordComponent)},
];
