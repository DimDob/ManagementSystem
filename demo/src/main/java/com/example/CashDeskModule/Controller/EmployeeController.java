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
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/employees")
@CrossOrigin(origins = "http://localhost:4200")
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

    @PostMapping
    public ResponseEntity<String> createEmployee(@RequestHeader("FIB-X-AUTH") String apiKey,
                                                 @Valid @RequestBody Employee employee) {
        if (!API_KEY.equals(apiKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid API Key");
        }

        employeeService.saveEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body("Employee created successfully!");
    }

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

    @GetMapping
    public ResponseEntity<Optional<List<Employee>>> getAllEmployees(@RequestHeader("FIB-X-AUTH") String apiKey) {
        if (!API_KEY.equals(apiKey)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid API Key");
        }

        Optional<List<Employee>> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

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
