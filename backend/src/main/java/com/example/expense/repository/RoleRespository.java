package com.example.expense.repository;

import com.example.expense.model.ERole;
import com.example.expense.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRespository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
