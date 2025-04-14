package com.example.CashDeskModule.Controller;

import com.example.CashDeskModule.Entity.Employee;
import com.example.CashDeskModule.Service.EmployeeServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/department")
public class DepartmentController {

    @Value("${API_KEY}")
    private String API_KEY;

    private final EmployeeServiceImpl employeeService;

    public DepartmentController(EmployeeServiceImpl employeeService) {
        this.employeeService = employeeService;
    }

    private boolean validateAPIKey(HttpServletRequest request) {
        String apiKey = request.getHeader("FIB-X-AUTH");
        return API_KEY.equals(apiKey);
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<String> getDepartmentByEmployeeId(@RequestHeader("FIB-X-AUTH") String apiKey,
                                                            @PathVariable UUID id) throws IOException {
        if (!API_KEY.equals(apiKey)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid API Key");
        }

        Optional<Employee> employee = employeeService.getEmployeeById(id);
        if (employee.isPresent()) {
            String department = employee.get().getDepartment();
            return ResponseEntity.ok("Employee's department: " + department);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        }
    }
}
