package com.bizpulse.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bizpulse.backend.model.Goal;
import com.bizpulse.backend.repository.GoalRepository;

@Service
public class GoalService {

    @Autowired
    GoalRepository goalRepository;

    public List<Goal> findAll() {
        return goalRepository.findAll();
    }

    public Optional<Goal> findById(Integer id) {
        return goalRepository.findById(id);
    }

    public Goal create(Goal goal) {
        return goalRepository.save(goal);
    }

    public Goal edit(Goal goal) {
        return goalRepository.save(goal);
    }

    public void deleteById(Integer id) {
        goalRepository.deleteById(id);
    }
}
