package com.example.CashDeskModule.Controller;

import com.example.CashDeskModule.Entity.CashOperationRequest;
import com.example.CashDeskModule.Entity.Employee;
import com.example.CashDeskModule.Service.CashBalanceServiceImpl;
import com.example.CashDeskModule.Service.CashOperationsServiceImpl;
import com.example.CashDeskModule.Service.EmployeeServiceImpl;
import jakarta.validation.Valid;
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
public class CashOperationsController {

    @Value("${API_KEY}")
    private String API_KEY;

    private final CashOperationsServiceImpl cashOperationsServiceImpl;
    private final EmployeeServiceImpl employeeServiceImpl;
    private final CashBalanceServiceImpl cashBalanceServiceImpl;

    public CashOperationsController(CashOperationsServiceImpl cashOperationsServiceImpl, EmployeeServiceImpl employeeServiceImpl, CashBalanceServiceImpl cashBalanceServiceImpl) {
        this.cashOperationsServiceImpl = cashOperationsServiceImpl;
        this.employeeServiceImpl = employeeServiceImpl;
        this.cashBalanceServiceImpl = cashBalanceServiceImpl;
    }

    private boolean validateAPIKey(HttpServletRequest request) {
        String apiKey = request.getHeader("FIB-X-AUTH");
        return API_KEY.equals(apiKey);
    }

    @PostMapping("/cash-operation")
    public ResponseEntity<String> handleCashOperation(@RequestHeader("FIB-X-AUTH") String apiKey,
                                                      @Valid @RequestBody CashOperationRequest request) throws IOException {
        if (!API_KEY.equals(apiKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid API Key");
        }

        Optional<CashOperationRequest> processedTransaction = cashOperationsServiceImpl.processTransaction(request);
        if (processedTransaction.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unsuccessful: Invalid transaction details");
        }

        return ResponseEntity.ok("Transaction has been processed successfully!");
    }

    @GetMapping("/cash-balance")
    public ResponseEntity<String> getCashBalance(@RequestHeader("FIB-X-AUTH") String apiKey,
                                                 @RequestParam String currency) throws IOException {
        if (!API_KEY.equals(apiKey)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid API Key");
        }
        String cashBalance = cashBalanceServiceImpl.getBalance(currency);
        if (cashBalance.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unsuccessful: Invalid balance details");
        }

        return ResponseEntity.ok("Balance has been processed successfully!");
    }

    @GetMapping("/employee/{id}/salary")
    public ResponseEntity<String> getEmployeeSalaryById(@RequestHeader("FIB-X-AUTH") String apiKey,
                                                        @PathVariable UUID id) throws IOException {
        if (!API_KEY.equals(apiKey)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid API Key");
        }

        Optional<BigDecimal> employeeSalaryAmountById = employeeServiceImpl.getEmployeeSalaryAmountById(id);

        if (employeeSalaryAmountById.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        }

        return ResponseEntity.ok("Employee salary amount: " + employeeSalaryAmountById.get());
    }

    @PatchMapping("/employee/{id}/salary")
    public ResponseEntity<String> updateEmployeeSalary(@RequestHeader("FIB-X-AUTH") String apiKey,
                                                       @PathVariable UUID id,
                                                       @RequestBody BigDecimal newSalaryAmount) {
        if (!API_KEY.equals(apiKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid API Key");
        }

        Optional<Employee> updatedEmployee = employeeServiceImpl.updateEmployeeSalary(id, newSalaryAmount);

        if (updatedEmployee.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }

        return ResponseEntity.ok("Employee salary updated successfully!");
    }


}
