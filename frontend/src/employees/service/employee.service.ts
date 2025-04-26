import { environment } from './../../app/auth/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private environment = environment;

  private endpoint = `/api/v1/employees`;

  http = inject(HttpClient);

  public createEmployee(employee: Employee): Observable<string> {
    return this.http.post<string>(
      `${this.environment.host}${this.endpoint}`,
      employee,
      { responseType: 'text' as 'json' }
    );
  }

  public updateEmployeeSalary(id: string, employee: Employee): Observable<string> {
    return this.http.put<string>(
      `${this.environment.host}//${id}`,
      employee,
      { responseType: 'text' as 'json' }
    );
  }

  public deleteById(id: string): Observable<string> {
    return this.http.delete<string>(
      `${this.environment.host}${this.endpoint}/${id}`,
      { responseType: 'text' as 'json' }
    );
  }

  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.environment.host}${this.endpoint}`);
  }

  public getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.environment.host}${this.endpoint}/${id}`);
  }
}
