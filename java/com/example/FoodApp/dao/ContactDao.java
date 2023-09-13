package com.example.FoodApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.FoodApp.model.Contact;


public interface ContactDao extends JpaRepository<Contact,Integer> {

}
