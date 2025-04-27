package com.example.EmployeeManagementSystem.Controller;

import com.example.EmployeeManagementSystem.DTO.ChangePasswordRequest;
import com.example.EmployeeManagementSystem.DTO.EmailRequest;
import com.example.EmployeeManagementSystem.DTO.LoginRequest;
import com.example.EmployeeManagementSystem.Entity.User;
import com.example.EmployeeManagementSystem.Service.AuthServiceImpl;
import com.example.EmployeeManagementSystem.Service.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Authentication", description = "API for authentication operations")
public class AuthOperationsController {

    @Value("${API_KEY}")
    private String API_KEY;

    @Autowired
    private AuthServiceImpl authService;

    @Autowired
    private UserServiceImpl userService;

    @Operation(summary = "Get an authentication token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Token not found")
    })
    @GetMapping("/token")
    public String getAuthToken() {
        return (String) authService.getToken()
                .orElse("Token not found");
    }

    @Operation(summary = "Authenticate user and retrieve token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Authentication successful"),
            @ApiResponse(responseCode = "401", description = "Authentication failed")
    })
    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            String token = userService.authenticateUserById(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );

            return ResponseEntity.ok(token);
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }

    @Operation(summary = "Register a new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User registered successfully")
    })
    @PostMapping("/register")
    public ResponseEntity<UUID> createUser(@Valid @RequestBody User user) {
        return userService.createUser(user);
    }

    @Operation(summary = "Send forgot password email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password reset instructions sent"),
            @ApiResponse(responseCode = "404", description = "Email not found")
    })
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@Valid @RequestBody EmailRequest email) {
        return userService.forgotPassword(email);
    }

    @Operation(summary = "Change password for user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password changed successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PutMapping("/change-password")
    public ResponseEntity<UUID> changePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        return userService.changePassword(changePasswordRequest.getId(), changePasswordRequest.getNewPassword())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}