package com.example.EmployeeManagementSystem.Service;

import com.example.EmployeeManagementSystem.Entity.Employee;
import com.example.EmployeeManagementSystem.Repository.EmployeeServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final EmployeeServiceRepository employeeRepository;

    @Autowired
    public DepartmentServiceImpl(EmployeeServiceRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    public Optional<String> getDepartmentById(UUID employeeId) {
        return employeeRepository.findById(employeeId)
                .map(Employee::getDepartment);
    }

}
