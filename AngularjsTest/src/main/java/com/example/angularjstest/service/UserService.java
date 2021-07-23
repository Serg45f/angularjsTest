package com.example.angularjstest.service;

import com.example.angularjstest.model.User;

import java.util.List;


public interface UserService {

    User register(User user);

    List<User> getAll();

    User findByUsername(String username);

    User findById(Long id);

    User save(User user);

    void delete(Long id);
}
