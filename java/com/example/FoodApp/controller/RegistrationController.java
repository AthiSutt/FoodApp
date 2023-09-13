package com.example.FoodApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.FoodApp.dao.UserDaoImpl;
import com.example.FoodApp.model.User;

@RestController
//@CrossOrigin(origins = "http://localhost:4200/#/")
@CrossOrigin(origins ="*")
public class RegistrationController {

    @Autowired
    private UserDaoImpl userDao;

    @RequestMapping("/api/register")
    @ResponseBody()
    //@CrossOrigin(origins = "http://localhost:4200")
    public User showRegister() {
        return new User();
    }

    @PostMapping("/register")
    @ResponseBody()
    //@CrossOrigin(origins = "http://localhost:4200")
    public User addUser(@RequestBody User user, Model model) {
        System.out.println(user.toString());
        userDao.register(user);
        return user;
    }

    @PostMapping("/checkUserName")
    @ResponseBody()
    //@CrossOrigin(origins = "http://localhost:4200")
    public boolean checkAvailability(@RequestBody String username, Model model){
        return userDao.usernameExists(username);
    }
    
    public WebMvcConfigurer configure() {
		return new WebMvcConfigurer() {
			
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/*").allowedOrigins("http://localhost:4200");
			}
		};
    	
    }
}