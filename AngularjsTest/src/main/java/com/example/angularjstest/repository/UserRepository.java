package com.example.angularjstest.repository;

import com.example.angularjstest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String name);
}
