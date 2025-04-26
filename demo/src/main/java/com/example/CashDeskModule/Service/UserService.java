package com.example.CashDeskModule.Service;

import com.example.CashDeskModule.Entity.EmailRequest;
import com.example.CashDeskModule.Entity.User;
import org.springframework.http.ResponseEntity;

import javax.naming.AuthenticationException;
import java.util.UUID;

public interface UserService {

    String authenticateUserById(String userEmail, String userPassword) throws AuthenticationException;

    ResponseEntity<UUID> createUser(User createUserRequest);

    ResponseEntity<String> forgotPassword(EmailRequest email);
}
