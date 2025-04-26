package com.example.CashDeskModule.Service;

import com.example.CashDeskModule.Entity.User;

import java.util.Optional;

public interface AuthService {

    Optional<String> getToken();

}
