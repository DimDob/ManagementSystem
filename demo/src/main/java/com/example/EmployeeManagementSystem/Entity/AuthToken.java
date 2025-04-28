package com.example.EmployeeManagementSystem.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class AuthToken {
        @Id
        private String token;

}
