package com.example.expense.payload.response;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String token;
    private String id;
    private String email;
    private List<String> roles;
    private String type = "Bearer";

    public JwtResponse(String token, String id, String email, List<String> roles) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.roles = roles;
    }
}
