package com.example.expense.controller;

import com.example.expense.model.Expense;
import com.example.expense.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/expenses")
    Collection<Expense> getExpenses() {
        return expenseRepository.findAll();
    }

    @GetMapping("/expense/{id}")
    ResponseEntity<?> getExpense(@PathVariable String id) {
        Optional<Expense> expense = expenseRepository.findById(id);
        return expense.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/expense/{id}")
    ResponseEntity<?> deleteExpense(@PathVariable String id) {
        expenseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/expense")
    ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) throws URISyntaxException {
        Expense result = expenseRepository.save(expense);
        return ResponseEntity.created(new URI("/api/expense/" + result.getId())).body(result);
    }

    @PutMapping("/expense/{id}")
    ResponseEntity<Expense> updateExpense(@Valid @RequestBody Expense expense) {
        Expense result = expenseRepository.save(expense);
        return ResponseEntity.ok().body(result);
    }

}
