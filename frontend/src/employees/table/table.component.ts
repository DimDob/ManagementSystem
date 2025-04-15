import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Employee } from '../model/employee.model';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Employee[] = [
  {
    id: '1',
    name: 'Alice',
    surname: 'Johnson',
    department: 'Engineering',
    salary: '$100k',
    salary_amount: 100000,
    email: 'alice.johnson@example.com',
    employee_phone_number: '123-456-7890'
  },
  {
    id: '2',
    name: 'Bob',
    surname: 'Smith',
    department: 'Marketing',
    salary: '$85k',
    salary_amount: 85000,
    email: 'bob.smith@example.com',
    employee_phone_number: '234-567-8901'
  },
];


/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: 'table.component.html',
  styleUrl: 'table.component.css',
})
export class TableComponent {
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

  dataSource = ELEMENT_DATA;
}
