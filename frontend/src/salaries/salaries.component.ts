import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Employee } from '../employees/model/employee.model';
import { EmployeeService } from '../employees/service/employee.service';
import { displayedColumns } from './salaries-table-data.ts/salaries-table-data';
import { SalaryService } from './service/salary.service';


@Component({
  selector: 'salaries-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: 'salaries.component.html',
  styleUrl: 'salaries.component.css',
})
export class SalariesComponent implements OnInit {

  public displayedColumns: string[] = displayedColumns;

  public ELEMENT_DATA: Employee[] = [];

  employeeService = inject(EmployeeService);

  salaryService = inject(SalaryService);

  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (employeeData) => {
        this.dataSource = employeeData;
        this.cdr.detectChanges();
        this.salaryService.employeeDataSubject.next(employeeData);
      },
      error: () => alert('Error fetching employees')
    });
  }

  dataSource = this.ELEMENT_DATA;
}
