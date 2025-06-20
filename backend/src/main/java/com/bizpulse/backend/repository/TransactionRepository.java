package com.bizpulse.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bizpulse.backend.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

}
