package com.lostandfound.service;

import com.lostandfound.model.User;
import com.lostandfound.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Method to register a new user
    public void registerUser(User user) {
        userRepository.save(user);
    }

    // Method to handle login (check if user exists)
    public ResponseEntity<String> loginUser(String email, String password) {
        // Fetch the user from the repository using email
        Optional<User> user = userRepository.findByEmail(email);

        // If the user is found and the password matches, return a success message
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok("Login successful");  // Success message with HTTP 200 status
        }

        // If the user doesn't exist or password is incorrect, return an error message
        return ResponseEntity.status(401).body("Invalid credentials");  // Unauthorized error (HTTP 401)
    }
}
