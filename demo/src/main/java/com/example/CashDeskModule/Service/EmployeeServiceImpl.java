package com.example.CashDeskModule.Service;

import com.example.CashDeskModule.Entity.Employee;
import com.example.CashDeskModule.Repository.EmployeeServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeServiceRepository employeeServiceRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeServiceRepository employeeServiceRepository) {
        this.employeeServiceRepository = employeeServiceRepository;
    }

    @Override
    public Optional<Employee> getEmployeeById(UUID id) throws IOException {
        return employeeServiceRepository.findById(id);
    }

    public Optional<BigDecimal> getEmployeeSalaryAmountById(UUID employeeId) {
        Optional<Employee> employee = employeeServiceRepository.findById(employeeId);
        return employee.map(Employee::getSalaryAmount);
    }

    @Override
    public Optional<Employee> saveEmployee(Employee employee) {
        Employee saved = employeeServiceRepository.save(employee);
        return Optional.of(saved);
    }

    @Override
    public Optional<List<Employee>> getAllEmployees() {
        List<Employee> all = employeeServiceRepository.findAll();
        return all.isEmpty() ? Optional.empty() : Optional.of(all);
    }

    @Override
    public Optional<Employee> updateEmployee(UUID id, Employee updatedEmployee) {
        return employeeServiceRepository.findById(id).map(existing -> {
            existing.setName(updatedEmployee.getName());
            existing.setSurname(updatedEmployee.getSurname());
            existing.setEmail(updatedEmployee.getEmail());
            existing.setDepartment(updatedEmployee.getDepartment());
            existing.setSalary(updatedEmployee.getSalary());
            existing.setSalaryAmount(updatedEmployee.getSalaryAmount());

            return employeeServiceRepository.save(existing);
        });
    }

    @Override
    public Optional<Employee> deleteEmployee(UUID id) {
        Optional<Employee> employee = employeeServiceRepository.findById(id);
        employee.ifPresent(emp -> employeeServiceRepository.deleteById(id));
        return employee;
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
