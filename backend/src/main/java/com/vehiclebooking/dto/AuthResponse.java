package com.vehiclebooking.dto;

public class AuthResponse {
    private String token;
    private String role;

    // No-arg constructor
    public AuthResponse() {
    }

    // All-args constructor
    public AuthResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // Optional: toString method for logging/debugging
    @Override
    public String toString() {
        return "AuthResponse{" +
                "token='" + token + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
