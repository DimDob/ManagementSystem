package com.example.EmployeeManagementSystem.Repository;
import org.springframework.data.jpa.repository.Query;
import com.example.EmployeeManagementSystem.Entity.AuthToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthTokenRepository extends JpaRepository<AuthToken, Long> {

    @Query(value = "SELECT token FROM auth_token", nativeQuery = true)
    String getToken();
}

