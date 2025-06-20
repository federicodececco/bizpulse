package com.bizpulse.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bizpulse.backend.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
