package com.example.FoodApp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.example.FoodApp.model.Cart;
import com.example.FoodApp.model.NewCart;

@Repository
public interface CartDao extends JpaRepository<Cart,Integer>{

	void saveToCart(NewCart[] cart);

	int claculateTotal(NewCart[] cart);

	void updateDB();

	void addItems(NewCart[] cart);

	boolean addNewItem(MultipartFile file, String newFoodData);

	boolean addNewItemWithUrl(String newFoodData);

	boolean itemIdAvailable(String itemId);

	List<NewCart> getAllCart();

	

}
