package com.example.EmployeeManagementSystem.Service;

import com.example.EmployeeManagementSystem.Entity.Employee;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public interface EmployeeService {

    Optional<Employee> getEmployeeById(UUID id) throws IOException;

    Optional<Employee> saveEmployee(Employee employee);

    Optional<List<Employee>> getAllEmployees();

    Optional<Employee> updateEmployee(UUID id, Employee updatedEmployee);

    Optional<Employee> deleteEmployee(UUID id);

}
