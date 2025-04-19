import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../../employees/model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {

    employeeDataSubject = new BehaviorSubject<Employee[]>([]);

    employeeDataObservable = this.employeeDataSubject.asObservable();


}
