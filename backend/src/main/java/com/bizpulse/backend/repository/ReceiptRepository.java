package com.bizpulse.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bizpulse.backend.model.Receipt;

public interface ReceiptRepository extends JpaRepository<Receipt, Integer> {

}
