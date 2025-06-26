package com.bizpulse.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bizpulse.backend.model.Receipt;
import com.bizpulse.backend.repository.ReceiptRepository;

@Service
public class ReceiptService {

    @Autowired
    ReceiptRepository receiptRepository;

    public List<Receipt> findAll() {
        return receiptRepository.findAll();
    }

    public Optional<Receipt> findById(Integer id) {
        return receiptRepository.findById(id);
    }

    public Receipt create(Receipt receipt) {
        return receiptRepository.save(receipt);
    }

    public Receipt edit(Receipt receipt) {
        return receiptRepository.save(receipt);
    }

    public void deleteById(Integer id) {
        receiptRepository.deleteById(id);
    }
}
