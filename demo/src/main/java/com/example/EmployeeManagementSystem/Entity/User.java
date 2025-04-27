package com.example.EmployeeManagementSystem.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "Users")
public class User {

    @Getter
    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "email")
    private String email;

    @Setter
    @Column(name = "password")
    private String password;

    @Column(name = "isAdmin")
    private String isAdmin;

    public String getIsAdmin() {
        return isAdmin;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

}
