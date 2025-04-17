import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl: string = `http://localhost:8080/api/v1`;

  http = inject(HttpClient);

  public createEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders()
    .set('FIB-X-AUTH', 'f9Uie8nNf112hx8s')
    .set('Content-Type', 'application/json');

    return this.http.post<Employee>(`${this.apiUrl}/employees`, employee, { headers });
  }

  public updateEmployeeSalary(id: string, employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders()
    .set('FIB-X-AUTH', 'f9Uie8nNf112hx8s')
    .set('Content-Type', 'application/json');
    return this.http.put<Employee>(`${this.apiUrl}/employees/${id}`, employee, { headers });
  }

  public deleteById(id: string): Observable<Employee> {
    const headers = new HttpHeaders()
    .set('FIB-X-AUTH', 'f9Uie8nNf112hx8s')
    .set('Content-Type', 'application/json');
    return this.http.delete<Employee>(`${this.apiUrl}/employees/${id}`, { headers });
  }

  public getAllEmployees(): Observable<Employee[]> {
    const headers = new HttpHeaders()
    .set('FIB-X-AUTH', 'f9Uie8nNf112hx8s')
    .set('Content-Type', 'application/json');
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`, { headers });
  }
}
