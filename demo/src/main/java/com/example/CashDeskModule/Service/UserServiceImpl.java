package com.example.CashDeskModule.Service;

import com.example.CashDeskModule.DTO.EmailRequest;
import com.example.CashDeskModule.Entity.User;
import com.example.CashDeskModule.Repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final AuthService authService;
    private final UserRepository userRepository;

    private final MailService mailService;

    public UserServiceImpl(AuthService authService, UserRepository userRepository, MailService mailService) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    @Override
    public String authenticateUserById(String userEmail, String userPassword) throws AuthenticationException {

        Optional<User> user = userRepository.findUserByEmail(userEmail);

        if (user.isPresent()) {
            User foundUser = user.get();

            if (foundUser.getPassword().equals(userPassword)) {
                Optional<String> token = authService.getToken();

                if (token.isPresent()) {
                    return token.get();
                } else {
                    throw new AuthenticationException("Token not found!");
                }
            } else {
                throw new AuthenticationException("Invalid password!");
            }
        } else {
            throw new AuthenticationException("User not registered!");
        }
    }

    @Override
    public ResponseEntity<UUID> createUser(User user) {
        Optional<User> existingUser = userRepository.findUserByEmail(user.getEmail());

        if (existingUser.isEmpty()) {
            User savedUser = userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser.getId());
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @Override
    public ResponseEntity<String> forgotPassword(EmailRequest email) {
        Optional<User> existingUser = userRepository.findUserByEmail(email.getEmail());

        if (existingUser.isPresent()) {

            String userUUID = String.valueOf(existingUser.get().getId());

            String subject = "Password Reset Request";

            String resetLink = "http://localhost:4200/auth/change-password?token=" + userUUID;

            String body = "Click the following link to reset your password: " + resetLink;

            mailService.sendEmail(email.getEmail(), subject, body);

            return ResponseEntity.ok("Password reset instructions have been sent to your email.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No user found with this email.");
        }
    }

    @Override
    public Optional<UUID> changePassword(UUID id, String newPassword) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setPassword(newPassword);
            User savedUser = userRepository.save(existingUser);
            return savedUser.getId();
        });
    }


}
