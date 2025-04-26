package com.example.CashDeskModule.Service;

import com.example.CashDeskModule.Repository.AuthTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthTokenRepository authTokenRepository;

    @Autowired
    public AuthServiceImpl(AuthTokenRepository authTokenRepository) {
        this.authTokenRepository = authTokenRepository;
    }

    @Override
    public Optional<String> getToken() {
        String authToken = authTokenRepository.getToken();
        if (authToken != null) {
            return Optional.of(authToken);
        } else {
            return Optional.empty();
        }
    }

}
