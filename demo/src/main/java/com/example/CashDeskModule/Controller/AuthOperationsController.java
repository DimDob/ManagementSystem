package com.example.CashDeskModule.Controller;

import com.example.CashDeskModule.DTO.ChangePasswordRequest;
import com.example.CashDeskModule.DTO.EmailRequest;
import com.example.CashDeskModule.DTO.LoginRequest;
import com.example.CashDeskModule.Entity.User;
import com.example.CashDeskModule.Service.AuthServiceImpl;
import com.example.CashDeskModule.Service.UserServiceImpl;
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
public class AuthOperationsController {

    @Value("${API_KEY}")
    private String API_KEY;

    @Autowired
    private AuthServiceImpl authService;

    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/token")
    public String getAuthToken() {
        return (String) authService.getToken()
                .orElse("Token not found");
    }

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

    @PostMapping("/register")
    public ResponseEntity<UUID> createUser(@Valid @RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@Valid @RequestBody EmailRequest email) {
            return userService.forgotPassword(email);
    }

    @PutMapping("/change-password")
    public ResponseEntity<UUID> changePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        return userService.changePassword(changePasswordRequest.getId(), changePasswordRequest.getNewPassword())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
