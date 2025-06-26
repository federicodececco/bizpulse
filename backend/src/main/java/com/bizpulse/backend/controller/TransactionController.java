package com.bizpulse.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties.Http;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bizpulse.backend.model.Transaction;
import com.bizpulse.backend.service.TransactionService;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
    
    @Autowired
    TransactionService transactionService;

    @GetMapping("/")
    public ResponseEntity<List<Transaction>> index(){
      try{
        List<Transaction> transactions = transactionService.findAll();
        return  ResponseEntity.ok(transactions);
        }catch(Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }       
    }
    @PostMapping("/")
    public ResponseEntity<Transaction> store(@RequestBody Transaction transaction){
        transaction.setUser_id(1);
        try{
        return new ResponseEntity<Transaction>(transactionService.create(transaction),HttpStatus.OK);
    }catch(Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

}
