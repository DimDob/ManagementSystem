import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../service/employee.service';
import { SharedService } from '../../service/shared.service';
import { BaseEmployeeComponent } from '../../../base-employee/base-employee.component';

@Component({
  selector: 'edit-employee',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [EmployeeService, SharedService],
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, MatCardModule, MatIconModule, MatFormFieldModule, FormsModule],
})
export class EditComponent extends BaseEmployeeComponent implements OnInit, OnDestroy {

  submitEmployee() {
    this.apiService.updateEmployeeSalary(this.sharedService.employee.id, this.sharedService.employee).subscribe({
      next: (res) => {
        this.sharedService.toggleForm();
        this.sharedService.resetForm();
        alert(res);
      },
      error: () => alert(`Error fetching employee with id ${this.sharedService.employee.id}`)
    });
  }

}
