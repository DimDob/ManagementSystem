import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Employee } from '../employees/model/employee.model';
import { EmployeeService } from '../employees/service/employee.service';


@Component({
  selector: 'salaries-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: 'salaries.component.html',
  styleUrl: 'salaries.component.css',
})
export class SalariesComponent implements OnInit {

  apiService = inject(EmployeeService);

  public ELEMENT_DATA: Employee[] = [];

  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.apiService.getAllEmployees().subscribe({
      next: (res) => {
        this.dataSource = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching employee:', err)
    });
  }

  displayedColumns: string[] = [
    'name',
    'surname',
    'department',
    'salary',
    'salary_amount'
  ];

  dataSource = this.ELEMENT_DATA;
}
