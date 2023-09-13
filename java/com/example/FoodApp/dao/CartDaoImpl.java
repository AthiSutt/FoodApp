package com.example.FoodApp.dao;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import com.example.FoodApp.model.Cart;
import com.example.FoodApp.model.Food;
import com.example.FoodApp.model.NewCart;
import com.example.FoodApp.model.NewFood;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CartDaoImpl {
	
//	 	private final CartDao cartDao ;
//	 	private final FoodDao foodDao ;
//	
	@Autowired
    CartDao cartDao;

    @Autowired
    FoodDao foodDao;

    @Value("${fileStorage}")
    private String storagePath;
    
    private final Logger logger = LoggerFactory.getLogger(CartDaoImpl.class); 
    
//    @Autowired
//    public CartDaoImpl(CartDao cartDao, FoodDao foodDao) {
//        this.cartDao = cartDao;
//        this.foodDao = foodDao;
//    }

    public void saveToCart(NewCart[] newCarts){
        cartDao.deleteAll();
        cartDao.flush();
        Cart cart= new Cart(1,0,0,0,0,0,0,0,0,0);
        cart.setQuantity1(newCarts[0].getQuantity());
        cart.setQuantity2(newCarts[1].getQuantity());
        cart.setQuantity3(newCarts[2].getQuantity());
        
        for (int i = 0; i < newCarts.length; i++) {
            switch (i) {
                case 0:
                    cart.setQuantity1(newCarts[i].getQuantity());
                    break;
                case 1:
                    cart.setQuantity2(newCarts[i].getQuantity());
                    break;
                case 2:
                    cart.setQuantity3(newCarts[i].getQuantity());
                    break;
                case 3:
                	cart.setQuantity4(newCarts[i].getQuantity());
                case 4:
                	cart.setQuantity5(newCarts[i].getQuantity());
                case 5:
                	cart.setQuantity6(newCarts[i].getQuantity());
                case 6:
                	cart.setQuantity7(newCarts[i].getQuantity());
                case 7:
                	cart.setQuantity8(newCarts[i].getQuantity());
                case 8:
                	cart.setQuantity9(newCarts[i].getQuantity());
                	
            }
        }
//        if(newCarts.length>3)
//            cart.setQuantity4(newCarts[3].getQuantity());
//        if(newCarts.length>4)
//        cart.setQuantity5(newCarts[4].getQuantity());
//        if(newCarts.length>5)
//        cart.setQuantity6(newCarts[6].getQuantity());
//        if(newCarts.length>6)
//            cart.setQuantity7(newCarts[7].getQuantity());
//        if(newCarts.length>7)
//            cart.setQuantity8(newCarts[8].getQuantity());
//        if(newCarts.length>8)
//            cart.setQuantity9(newCarts[9].getQuantity());
//        if(newCarts.length>9)
//            cart.setQuantity10(newCarts[10].getQuantity());
//        cartDao.save(cart);
    }

    public void updateDB(){
    	try {
    		logger.info("Updating database...");
    		
    		List<Cart> carts =cartDao.findAll();
            Cart cart = carts.get(0);
            List<Food> foods = (List<Food>) foodDao.findAll();
            foods.get(0).setQuantity(foods.get(0).getQuantity()-cart.getQuantity1());
            foods.get(1).setQuantity(foods.get(1).getQuantity()-cart.getQuantity2());
            foods.get(2).setQuantity(foods.get(2).getQuantity()-cart.getQuantity3());
            if(foods.size()>3)
            foods.get(3).setQuantity(foods.get(3).getQuantity()-cart.getQuantity4());
            if(foods.size()>4)
                foods.get(4).setQuantity(foods.get(4).getQuantity()-cart.getQuantity5());
            if(foods.size()>5)
                foods.get(5).setQuantity(foods.get(5).getQuantity()-cart.getQuantity6());
            foodDao.saveAll(foods);
    	}catch(Exception e) {
    		logger.error("Database update failed: {}", e.getMessage(), e);
            throw e; 
    	}
        
    }

    public List<Cart> getAllCart(){
        return cartDao.findAll();
    }

    public void addItems(NewCart[] cart){
        List<Food> foods = (List<Food>) foodDao.findAll();
        for(int i=0;i<foods.size();i++){
            foods.get(i).setQuantity(foods.get(i).getQuantity()+cart[i].getQuantity());
        }
        foodDao.saveAll(foods);
    }

    public boolean addNewItem(MultipartFile file, String newFoodData) throws IOException {
        NewFood newFood = new ObjectMapper().readValue(newFoodData,NewFood.class);
        if(!file.isEmpty())
        if(saveFileToAssets(file))
        {
            foodDao.save(new Food(newFood.getId(),newFood.getName(),newFood.getPrice(),newFood.getQuantityAvailable(),"/assets/"+file.getOriginalFilename(),"",""));
//            foodDao.save(new Food(newFood.getId(),newFood.getName(),newFood.getPrice(),newFood.getQuantityAvailable(),"\\"+file.getOriginalFilename(),"",""));
        }
        return true;
    }

    public boolean addNewItemWithUrl(String newFoodData) throws IOException {
        NewFood newFood = new ObjectMapper().readValue(newFoodData,NewFood.class);
        foodDao.save(new Food(newFood.getId(),newFood.getName(),newFood.getPrice(),newFood.getQuantityAvailable(),newFood.getFileDataF(),"",""));
        return true;
    }

    private boolean saveFileToAssets(MultipartFile file) throws IOException {
        Path filepath = Paths.get(storagePath, file.getOriginalFilename());
        file.transferTo(filepath);
        return true;
    }

    public int claculateTotal(NewCart[] newCart){
        int total=0;
        List<Food> foods = (List<Food>) foodDao.findAll();

        for(int i=0;i<foods.size();i++)
        {
            total+=foods.get(i).getPrice()*newCart[i].getQuantity();
        }
        return total;
    }

    public boolean itemIdAvailable(String itemId) {
        return foodDao.findById(itemId).isPresent();
    }
    
   
}
