package com.example.CashDeskModule.Service;

import com.example.CashDeskModule.Entity.Employee;
import com.example.CashDeskModule.Repository.EmployeeServiceRepository;
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
