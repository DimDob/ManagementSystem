package com.example.CashDeskModule.Repository;

import com.example.CashDeskModule.Entity.CashOperationRequest;
import com.example.CashDeskModule.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmployeeServiceRepository extends JpaRepository<Employee, UUID> {}