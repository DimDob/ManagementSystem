package com.example.EmployeeManagementSystem.Service;

import com.example.EmployeeManagementSystem.Entity.Employee;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

@Service
public interface SalaryService {

    Optional<BigDecimal> getEmployeeSalaryAmountById(UUID employeeId);

    Optional<Employee> updateEmployeeSalary(UUID id, BigDecimal newSalaryAmount);

}
