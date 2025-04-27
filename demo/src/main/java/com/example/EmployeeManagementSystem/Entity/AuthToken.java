package com.example.EmployeeManagementSystem.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.NonNull;

@Entity
public class AuthToken {
        @Id
        @NonNull
        private String token;

}
