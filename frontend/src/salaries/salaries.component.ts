import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Employee } from '../employees/model/employee.model';
import { EmployeeService } from '../employees/service/employee.service';
import { displayedColumns } from './salaries-table-data.ts/salaries-table-data';
import { SalaryService } from './service/salary.service';
import { BaseTableComponent } from '../base-table/base-table.component';


@Component({
  selector: 'salaries-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: 'salaries.component.html',
  styleUrl: 'salaries.component.css',
})
export class SalariesComponent extends BaseTableComponent implements OnInit {

  public displayedColumns: string[] = displayedColumns;

  public ELEMENT_DATA: Employee[] = [];

  employeeService = inject(EmployeeService);

  salaryService = inject(SalaryService);


  override ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (employeeData) => {
        this.dataSource = employeeData;
        this.salaryService.employeeDataSubject.next(employeeData);
      },
      error: () => alert('Error fetching employees')
    });

    super.ngOnInit();
  }

  dataSource = this.ELEMENT_DATA;
}
