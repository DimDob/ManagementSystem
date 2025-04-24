import { SharedService } from './../service/shared.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EmployeeService } from '../service/employee.service';
import { BaseEmployeeComponent } from '../../base-employee/base-employee.component';

@Component({
  selector: 'delete-employee',
  providers: [EmployeeService, SharedService],
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule,MatInputModule, MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, MatCardModule, MatIconModule, MatFormFieldModule, FormsModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent extends BaseEmployeeComponent implements OnInit, OnDestroy {

  deleteEmployee() {
    this.apiService.deleteById(this.sharedService.employee.id).subscribe({
      next: (res) => {
        this.sharedService.toggleForm();
        this.sharedService.resetForm();
        alert(res)
      },
      error: () => alert(`Employee with id ${this.sharedService.employee.id} has not been found`)
    });

  }
}
