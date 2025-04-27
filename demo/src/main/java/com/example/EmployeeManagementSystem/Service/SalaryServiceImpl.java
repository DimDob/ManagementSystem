package com.example.EmployeeManagementSystem.Service;

import com.example.EmployeeManagementSystem.Entity.Employee;
import com.example.EmployeeManagementSystem.Repository.EmployeeServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

@Service
public class SalaryServiceImpl {

    private final EmployeeServiceRepository employeeServiceRepository;

    @Autowired
    public SalaryServiceImpl(EmployeeServiceRepository employeeServiceRepository) {
        this.employeeServiceRepository = employeeServiceRepository;
    }

    public Optional<BigDecimal> getEmployeeSalaryAmountById(UUID employeeId) {
        Optional<Employee> employee = employeeServiceRepository.findById(employeeId);
        return employee.map(Employee::getSalaryAmount);
    }

    public Optional<Employee> updateEmployeeSalary(UUID id, BigDecimal newSalaryAmount) {
        Optional<Employee> employeeOptional = employeeServiceRepository.findById(id);

        if (employeeOptional.isEmpty()) {
            return Optional.empty();
        }

        Employee employee = employeeOptional.get();
        employee.setSalaryAmount(newSalaryAmount);

        return Optional.of(employeeServiceRepository.save(employee));
    }
}
