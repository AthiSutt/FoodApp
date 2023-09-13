package com.example.FoodApp.utility;

import org.springframework.beans.factory.annotation.Value;

public class passwprdEncrypt {
	
	@Value("${AES.Key}")
    private String AESKey;
	public String encrypt(String password){
        return this.AESKey;
    }

}

class Check{
    public static void main(String[] args) {
    	passwprdEncrypt passwprdencrypt = new passwprdEncrypt();
        System.out.println(passwprdencrypt.encrypt("athira"));
    }
}
