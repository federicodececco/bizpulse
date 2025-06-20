package com.bizpulse.backend.model;

import java.time.Instant;
import java.util.Set;

import javax.management.relation.Role;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(min = 3, message = "username must be at least 3 character long")
    @NotBlank(message = "username cannot be emtpy, null or blanck")
    private String username;

    @NotBlank(message = "password cannot be null, empty or blanck")
    @Size(min = 6, message = "passowrd must be at least 6 chracter long")
    private String password;

    // private Set<Role> roles;

    @Column(unique = true)
    @Email(message = "use a valid email address")
    private String email;

    @CreationTimestamp
    private Instant created_at;

    public Users(String username, String password, String email) {

        this.username = username;
        this.password = password;
        this.email = email;

    }

    public Users() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    @UpdateTimestamp
    private Instant last_updated_at;
}
