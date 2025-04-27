package com.example.EmployeeManagementSystem.Controller;

import com.example.EmployeeManagementSystem.Entity.Employee;
import com.example.EmployeeManagementSystem.Service.EmployeeServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/employees")
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Employees", description = "API for managing employees")
public class EmployeeController {

    @Value("${API_KEY}")
    private String API_KEY;

    private final EmployeeServiceImpl employeeService;

    public EmployeeController(EmployeeServiceImpl employeeService) {
        this.employeeService = employeeService;
    }

    private boolean validateAPIKey(HttpServletRequest request) {
        String apiKey = request.getHeader("FIB-X-AUTH");
        return API_KEY.equals(apiKey);
    }

    @Operation(summary = "Create a new employee")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Employee created successfully"),
            @ApiResponse(responseCode = "401", description = "Invalid API Key")
    })
    @PostMapping
    public ResponseEntity<String> createEmployee(@RequestHeader("FIB-X-AUTH") String apiKey,
                                                 @Valid @RequestBody Employee employee) {
        if (!API_KEY.equals(apiKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid API Key");
        }
        employeeService.saveEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body("Employee created successfully!");
    }

    @Operation(summary = "Get an employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee found"),
            @ApiResponse(responseCode = "401", description = "Invalid API Key"),
            @ApiResponse(responseCode = "404", description = "Employee not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@RequestHeader("FIB-X-AUTH") String apiKey,
                                                @PathVariable UUID id) throws IOException {
        if (!API_KEY.equals(apiKey)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid API Key");
        }

        Optional<Employee> employee = employeeService.getEmployeeById(id);
        return employee.map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
    }

    @Operation(summary = "Get all employees")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employees retrieved"),
            @ApiResponse(responseCode = "401", description = "Invalid API Key")
    })
    @GetMapping
    public ResponseEntity<Optional<List<Employee>>> getAllEmployees(@RequestHeader("FIB-X-AUTH") String apiKey) {
        if (!API_KEY.equals(apiKey)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid API Key");
        }

        Optional<List<Employee>> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @Operation(summary = "Update an existing employee")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee updated"),
            @ApiResponse(responseCode = "401", description = "Invalid API Key"),
            @ApiResponse(responseCode = "404", description = "Employee not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<String> updateEmployee(@RequestHeader("FIB-X-AUTH") String apiKey,
                                                 @PathVariable UUID id,
                                                 @Valid @RequestBody Employee updatedEmployee) {
        if (!API_KEY.equals(apiKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid API Key");
        }

        Optional<Employee> updated = employeeService.updateEmployee(id, updatedEmployee);
        if (updated.isPresent()) {
            return ResponseEntity.ok("Employee updated successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }
    }

    @Operation(summary = "Delete an employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee deleted"),
            @ApiResponse(responseCode = "401", description = "Invalid API Key"),
            @ApiResponse(responseCode = "404", description = "Employee not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@RequestHeader("FIB-X-AUTH") String apiKey,
                                                 @PathVariable UUID id) {
        if (!API_KEY.equals(apiKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid API Key");
        }

        Optional<Employee> deleted = employeeService.deleteEmployee(id);
        if (deleted.isPresent()) {
            return ResponseEntity.ok("Employee deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }
    }
}
