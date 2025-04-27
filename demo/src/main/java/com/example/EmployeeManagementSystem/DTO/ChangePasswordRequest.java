package com.example.EmployeeManagementSystem.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ChangePasswordRequest {

    private UUID id;

    private String newPassword;

}
