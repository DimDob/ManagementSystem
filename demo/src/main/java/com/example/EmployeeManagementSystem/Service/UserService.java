package com.example.EmployeeManagementSystem.Service;

import com.example.EmployeeManagementSystem.DTO.EmailRequest;
import com.example.EmployeeManagementSystem.Entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.Optional;
import java.util.UUID;

@Service
public interface UserService {

    String authenticateUserById(String userEmail, String userPassword) throws AuthenticationException;

    ResponseEntity<UUID> createUser(User createUserRequest);

    ResponseEntity<String> forgotPassword(EmailRequest email);

    Optional<UUID> changePassword(UUID id, String newPassword);
}
