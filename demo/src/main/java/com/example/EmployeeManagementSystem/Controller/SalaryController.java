package com.example.EmployeeManagementSystem.Controller;

import com.example.EmployeeManagementSystem.Entity.Employee;
import com.example.EmployeeManagementSystem.Service.SalaryServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Cash Operations", description = "API for cash operations, balances and employee salaries")
public class SalaryController {

    @Value("${API_KEY}")
    private String API_KEY;
    private final SalaryServiceImpl salaryServiceImpl;

    public SalaryController(SalaryServiceImpl salaryServiceImpl) {
        this.salaryServiceImpl = salaryServiceImpl ;
    }

    private boolean validateAPIKey(HttpServletRequest request) {
        String apiKey = request.getHeader("FIB-X-AUTH");
        return API_KEY.equals(apiKey);
    }

    @Operation(summary = "Get an employee's salary by their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee salary retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Employee not found"),
            @ApiResponse(responseCode = "401", description = "Invalid API Key")
    })
    @GetMapping("/employee/{id}/salary")
    public ResponseEntity<String> getEmployeeSalaryById(@RequestHeader("FIB-X-AUTH") String apiKey,
                                                        @PathVariable UUID id) throws IOException {
        if (!API_KEY.equals(apiKey)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid API Key");
        }

        Optional<BigDecimal> employeeSalaryAmountById = salaryServiceImpl.getEmployeeSalaryAmountById(id);

        if (employeeSalaryAmountById.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        }

        return ResponseEntity.ok("Employee salary amount: " + employeeSalaryAmountById.get());
    }

    @Operation(summary = "Update an employee's salary by their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee salary updated successfully"),
            @ApiResponse(responseCode = "404", description = "Employee not found"),
            @ApiResponse(responseCode = "401", description = "Invalid API Key")
    })
    @PatchMapping("/employee/{id}/salary")
    public ResponseEntity<String> updateEmployeeSalary(@RequestHeader("FIB-X-AUTH") String apiKey,
                                                       @PathVariable UUID id,
                                                       @RequestBody BigDecimal newSalaryAmount) {
        if (!API_KEY.equals(apiKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid API Key");
        }

        Optional<Employee> updatedEmployee = salaryServiceImpl.updateEmployeeSalary(id, newSalaryAmount);

        if (updatedEmployee.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }

        return ResponseEntity.ok("Employee salary updated successfully!");
    }
}