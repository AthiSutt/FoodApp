package com.example.FoodApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.FoodApp.dao.FoodDaoImpl;
import com.example.FoodApp.model.Food;

@RestController
@CrossOrigin(origins ="*")

public class FoodController {

    @Autowired
    FoodDaoImpl foodDao;

    @GetMapping(value = "/menu")
    //@CrossOrigin(origins = "http://localhost:4200")
    public List<Food> getMenu(Model model) {
        List<Food> foodItems ;
        foodItems = foodDao.getFoodList();
        return foodItems;
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMenuItem(@PathVariable String id){
    	try {
            // Call a service method to delete the item by its ID
    		
    		System.out.println("Deleting item with ID: " + id);
            foodDao.deleteByItemId(id);
            return ResponseEntity.ok("Menu item deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting menu item: " + e.getMessage());
        }
    }
    
  
    public WebMvcConfigurer configure() {
		return new WebMvcConfigurer() {
			
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/*").allowedOrigins("http://localhost:4200")
				.allowedMethods("GET","POST","PUT","DELETE")
				.allowedHeaders("*");
			}
		};
    	
    }


}

