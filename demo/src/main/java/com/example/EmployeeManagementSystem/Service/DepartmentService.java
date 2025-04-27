package com.example.EmployeeManagementSystem.Service;


import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
public interface DepartmentService {
    Optional<String> getDepartmentById(UUID employeeId) throws IOException;
}
