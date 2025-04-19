import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../service/employee.service';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'edit-employee',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [EmployeeService, SharedService],
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, MatCardModule, MatIconModule, MatFormFieldModule, FormsModule],
})
export class EditComponent implements OnInit, OnDestroy {

  showForm: boolean = false;

  apiService = inject(EmployeeService);

  sharedService = inject(SharedService);

  ngOnInit(): void {
    this.sharedService.toggleFormObservable.subscribe(show => {
      this.showForm = show;
    });

  }

  ngOnDestroy(): void {
      this.sharedService.toggleFormSubject.unsubscribe();
  }

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
