package com.example.EmployeeManagementSystem.Service;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface AuthService {

    Optional<String> getToken();

}
