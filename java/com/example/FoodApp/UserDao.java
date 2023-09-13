package com.example.FoodApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.FoodApp.model.User;


public interface UserDao extends JpaRepository<User,String> {

}
