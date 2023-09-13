package com.example.FoodApp.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.FoodApp.model.Food;

@Repository
public interface FoodDao extends JpaRepository<Food,String>{

	


}
