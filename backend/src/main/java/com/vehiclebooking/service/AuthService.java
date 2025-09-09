package com.vehiclebooking.service;

import com.vehiclebooking.dto.AuthRequest;
import com.vehiclebooking.dto.AuthResponse;
import com.vehiclebooking.dto.RegisterRequest;
import com.vehiclebooking.model.User;
import com.vehiclebooking.repository.UserRepository;
import com.vehiclebooking.util.JwtUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // ------------------ Register USER ------------------
    public AuthResponse registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhone())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .build();

        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getRole());
    }

    // ------------------ Register OWNER ------------------
    public AuthResponse registerOwner(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .companyName(request.getCompanyName())
                .phoneNumber(request.getPhone())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("OWNER")
                .build();

        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getRole());
    }

    // ------------------ Login USER ------------------
    public AuthResponse loginUser(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!"USER".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Account is not a user account");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getRole());
    }

    // ------------------ Login OWNER ------------------
    public AuthResponse loginOwner(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!"OWNER".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Account is not an owner account");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getRole());
    }
}
