package com.bizpulse.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bizpulse.backend.model.Goal;

public interface GoalRepository extends JpaRepository<Goal, Integer> {

}
