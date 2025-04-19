import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SalaryService } from '../service/salary.service';
import { Employee } from '../../employees/model/employee.model';
import { CsvRows } from './csv-rows';

@Component({
  selector: 'export-csv',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './export.component.html',
  styleUrl: './export.component.css'
})
export class ExportComponent implements OnInit {

  salaryService: SalaryService = inject(SalaryService);

  employees: Employee[] = [];

  public ngOnInit(): void {
      this.salaryService.employeeDataObservable.subscribe(employeeData => this.employees = employeeData);
  }

  public exportAsCSV(): void {
    const rows = [
      [CsvRows.NAME, CsvRows.DEPARTMENT, CsvRows.SALARY, CsvRows.SALARY_AMOUNT, CsvRows.EMAIL, CsvRows.PHONE_NUMBER],
      ...this.employees.map(e => [e.name, e.department, e.salary, e.salary_amount, e.email, e.employee_phone_number])
    ];

    const csvContent = rows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'employees.csv');
    link.click();
  }

}
