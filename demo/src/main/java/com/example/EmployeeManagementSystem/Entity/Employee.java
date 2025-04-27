package com.example.EmployeeManagementSystem.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Pattern;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Entity
@Table(name = "employees")
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "employee_name")
    private String name;

    @Column(name = "employee_surname")
    private String surname;

    @Column(name = "employee_department")
    private String department;

    @Column(name = "employee_salary")
    @Pattern(regexp = "EUR|BGN")
    private String salary;

    @Column(name = "salary_amount")
    @JsonProperty("salary_amount")
    private BigDecimal salaryAmount;

    @Column(name = "employee_email")
    private String email;

    @Column(name = "employee_phone_number")
    @JsonProperty("employee_phone_number")
    private String phoneNumber;
}
