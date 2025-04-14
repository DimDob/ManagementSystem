package com.example.CashDeskModule.Service;


import com.example.CashDeskModule.Entity.CashOperationRequest;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Component
public interface DepartmentService {
    Optional<String> getDepartmentById(UUID employeeId) throws IOException;
}
