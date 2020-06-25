package com.example.expense.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "expense")
public class Expense {
	@Id
	private String id;
	private String description;
	private Instant expenseDate;
	private Double amount;

	private Category category;

	@JsonIgnore
	private User user;
}
