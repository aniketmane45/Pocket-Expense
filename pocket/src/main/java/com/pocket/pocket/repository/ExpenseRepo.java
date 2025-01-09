package com.pocket.pocket.repository;

import com.pocket.pocket.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense,Integer> {
    List<Expense> findByUserId(int userId);
}
