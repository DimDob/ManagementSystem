import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee.model';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EditComponent } from "../edit/edit/edit.component";

@Component({
  selector: 'employees',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, MatCardModule, MatIconModule, MatFormFieldModule, FormsModule, EditComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  apiService = inject(EmployeeService);

  showForm = false;

  employee: Employee = {
    name: '',
    surname: '',
    department: '',
    salary: '',
    salary_amount: 0,
    email: '',
    employee_phone_number: ''
  };


  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitEmployee() {
    this.apiService.createEmployee(this.employee).subscribe({
      next: (res) => {
        console.log('Employee created:', res);
        this.toggleForm();
        this.resetForm();
      },
      error: (err) => console.error('Error creating employee:', err)
    });
  }



  resetForm() {
    this.employee = {
      name: '',
      surname: '',
      department: '',
      salary: '',
      salary_amount: 0,
      email: '',
      employee_phone_number: ''
    };
  }
}
