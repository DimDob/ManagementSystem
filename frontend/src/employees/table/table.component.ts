import {Component, inject, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Employee } from '../model/employee.model';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../service/employee.service';


@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: 'table.component.html',
  styleUrl: 'table.component.css',
})
export class TableComponent implements OnInit {

  apiService = inject(EmployeeService);

  public ELEMENT_DATA: Employee[] = [];


  ngOnInit(): void {
    this.apiService.getAllEmployees().subscribe({
      next: (res) => {
        this.ELEMENT_DATA.push(...res);
      },
      error: (err) => console.error('Error fetching employee:', err)
    });
  }


  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'department',
    'salary',
    'salary_amount',
    'email',
    'employee_phone_number'
  ];

  dataSource = this.ELEMENT_DATA;
}
