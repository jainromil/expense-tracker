package com.example.expense.payload.response;

import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String id;
    private String email;
    private String type = "Bearer";

    public JwtResponse(String token, String id, String email) {
        this.token = token;
        this.id = id;
        this.email = email;
    }
}
