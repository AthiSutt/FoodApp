package com.example.FoodApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.FoodApp.dao.UserDaoImpl;
import com.example.FoodApp.model.Login;
import com.example.FoodApp.model.User;
import com.example.FoodApp.utility.passwprdEncrypt;

@RestController
@CrossOrigin(origins ="*")
public class LoginController {

    @Autowired
    private UserDaoImpl userDao;

    //@CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/login")
    
    public Login showLogin() {
        return new Login();
    }

    //@CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
       public User loginProcess(@RequestBody Login login, Model model) {
        User user = null;
        user = userDao.validateUser(login);
        if(user!=null)
        user.setPassword(null);
        return user;
    }

    @RequestMapping("/xx")
    //@CrossOrigin(origins = "http://localhost:4200")
    private String xx(){
        return new passwprdEncrypt().encrypt("");
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
