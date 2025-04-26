package com.example.CashDeskModule.Controller;

import com.example.CashDeskModule.Service.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthOperationsController {

    @Autowired
    private AuthServiceImpl authService;

    @GetMapping("/token")
    public String getAuthToken() {
        return (String) authService.getToken()
                .orElse("Token not found");
    }

}
