package com.bizpulse.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bizpulse.backend.model.Goal;
import com.bizpulse.backend.service.GoalService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/goal")
public class GoalController {
    
    @Autowired 
    GoalService goalService;

    @GetMapping("/")
    public ResponseEntity<List<Goal>> getMethodName() {
        try{
            return new ResponseEntity<>(goalService.findAll(),HttpStatus.OK);
        }catch(Exception e){
            System.err.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    



}
