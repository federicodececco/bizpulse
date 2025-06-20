package com.bizpulse.backend.model;

import java.sql.Date;
import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "transacitons")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(precision = 8)
    private Double amount;

    private String vendor;

    private String category;

    private Date date;

    private String type;

    @CreationTimestamp
    private Instant created_at;

    @UpdateTimestamp
    private Instant last_updated_at;

    public Transaction(Double amount, String vendor, String category, Date date, String type) {
        this.amount = amount;
        this.vendor = vendor;
        this.category = category;
        this.date = date;
        this.type = type;
    }

    public Transaction() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Instant getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Instant created_at) {
        this.created_at = created_at;
    }

    public Instant getLast_updated_at() {
        return last_updated_at;
    }

    public void setLast_updated_at(Instant last_updated_at) {
        this.last_updated_at = last_updated_at;
    }

}
