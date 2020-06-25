package com.example.expense.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "roles")
public class Role {
    @Id
    private String id;
    private ERole name;

    public Role(ERole name) {
        this.name = name;
    }
}
