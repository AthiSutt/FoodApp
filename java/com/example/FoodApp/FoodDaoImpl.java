package com.example.FoodApp.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.FoodApp.model.Food;


@Service
public class FoodDaoImpl {
	
	@Autowired
    private FoodDao foodDao;


    public List<Food> getFoodList(){
        List<Food> food;
        food = (List<Food>) foodDao.findAll();
        return food;
    }

    public Food validateFoodInfo(String productId){
        Food food = null;
        food = foodDao.findById(productId).get();
        return food;
    }

	public void deleteByItemId(String id) {
		// TODO Auto-generated method stub
		foodDao.deleteById(id);
		
	}

}
