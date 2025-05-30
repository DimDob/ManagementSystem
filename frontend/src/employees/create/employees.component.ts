import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee.model';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EditComponent } from "../edit/edit/edit.component";
import { SharedService } from '../service/shared.service';
import { BaseEmployeeComponent } from '../../base-employee/base-employee.component';

@Component({
  selector: 'employees',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, MatCardModule, MatIconModule, MatFormFieldModule, FormsModule, EditComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent extends BaseEmployeeComponent implements OnInit, OnDestroy {

  submitEmployee() {
    this.apiService.createEmployee(this.sharedService.employee).subscribe({
      next: (res) => {
        this.sharedService.toggleForm();
        this.sharedService.resetForm();
        alert(res);
      },
      error: () => alert('Error creating employee')
    });
  }

}
