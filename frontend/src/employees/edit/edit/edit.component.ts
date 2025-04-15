import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'edit-employee',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, MatCardModule, MatIconModule, MatFormFieldModule, FormsModule, EditComponent],
})
export class EditComponent {

  showForm: boolean = false;

  employeeId: string = ''

  employeeIdOnChange = output<string>();

  employee: Employee = {
    name: '',
    surname: '',
    department: '',
    salary: '',
    salary_amount: 0,
    email: '',
    employee_phone_number: ''
  };

  apiService = inject(EmployeeService);


  toggleForm() {
    this.showForm = !this.showForm;
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


  submitEmployee() {
    this.apiService.updateEmployeeSalary(this.employeeId, this.employee).subscribe({
      next: () => {
        this.toggleForm();
        this.resetForm();
      },
      error: (err) => console.error('Error fetching employee:', err)
    });
  }

  deleteEmployee() {
    this.apiService.deleteById(this.employeeId).subscribe({
      next: () => {
        this.toggleForm();
        this.resetForm();
      },
      error: (err) => console.error('Error fetching employee:', err)
    });

  }
}
