package com.bizpulse.backend.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "goals")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer user_id;

    private String goal_name;

    private Double target_value;

    private Double current_value;

    private Date deadline;

    public Goal(Integer user_id, String goal_name, Double target_value, Double current_value, Date deadline) {
        this.user_id = user_id;
        this.goal_name = goal_name;
        this.target_value = target_value;
        this.current_value = current_value;
        this.deadline = deadline;
    }

    public Goal() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getGoal_name() {
        return goal_name;
    }

    public void setGoal_name(String goal_name) {
        this.goal_name = goal_name;
    }

    public Double getTarget_value() {
        return target_value;
    }

    public void setTarget_value(Double target_value) {
        this.target_value = target_value;
    }

    public Double getCurrent_value() {
        return current_value;
    }

    public void setCurrent_value(Double current_value) {
        this.current_value = current_value;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

}
