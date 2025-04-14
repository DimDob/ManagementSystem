package com.example.CashDeskModule.Service;

import com.example.CashDeskModule.Entity.Employee;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public interface EmployeeService {

    Optional<Employee> getEmployeeById(UUID id) throws IOException;

    Optional<Employee> saveEmployee(Employee employee);

    Optional<List<Employee>> getAllEmployees();

    Optional<Employee> updateEmployee(UUID id, Employee updatedEmployee);

    Optional<Employee> deleteEmployee(UUID id);

    Optional<Employee> updateEmployeeSalary(UUID id, BigDecimal newSalaryAmount);
}
