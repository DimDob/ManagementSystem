package com.example.EmployeeManagementSystem.Controller;

import com.example.EmployeeManagementSystem.Entity.Employee;
import com.example.EmployeeManagementSystem.Service.AuthServiceImpl;
import com.example.EmployeeManagementSystem.Service.EmployeeServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Department", description = "API for department-related operations")
public class DepartmentController {

    private final EmployeeServiceImpl employeeService;

    private final AuthServiceImpl authService;

    public DepartmentController(EmployeeServiceImpl employeeService, AuthServiceImpl authService) {
        this.employeeService = employeeService;
        this.authService = authService;
    }

    private boolean validateAPIKey(HttpServletRequest request) {
        String apiKey = request.getHeader("FIB-X-AUTH");
        return authService.getToken()
                .map(token -> token.equals(apiKey))
                .orElse(false);
    }

    @Operation(summary = "Get an employee's department by employee ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee's department retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Invalid API Key"),
            @ApiResponse(responseCode = "404", description = "Employee not found")
    })
    @GetMapping("/employee/{id}")
    public ResponseEntity<String> getDepartmentByEmployeeId(@RequestHeader("FIB-X-AUTH") String apiKey,
                                                            @PathVariable UUID id) throws IOException {
        if (authService.getToken().isPresent()) {
            if (!authService.getToken().get().equals(apiKey)) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid API Key");
            }
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
