// Main.java
package com.makeyourselfpretty;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import java.util.List;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}

// AuthController.java
package com.makeyourselfpretty;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Authentication logic
        return ResponseEntity.ok(new AuthResponse("jwt_token"));
    }
    
    @PostMapping("/google")
    public ResponseEntity<?> googleAuth(@RequestBody GoogleAuthRequest request) {
        // Verify Google auth code and authenticate user
        return ResponseEntity.ok(new AuthResponse("jwt_token"));
    }
    
    // Inner classes for request/response
    static class LoginRequest {
        private String email;
        private String password;
        // getters & setters
    }
    
    static class GoogleAuthRequest {
        private String authCode;
        // getters & setters
    }
    
    static class AuthResponse {
        private String token;
        // constructor & getter
    }
}

// ProductController.java
package com.makeyourselfpretty;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        // Return product list
        return ResponseEntity.ok(productService.getAllProducts());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        // Return single product
        return ResponseEntity.ok(productService.getProductById(id));
    }
}

// Product.java (Model)
package com.makeyourselfpretty.models;

import javax.persistence.*;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String description;
    private Double price;
    private String category; // dress, lingerie, accessories
    private String imageUrl;
    
    // Constructors, getters & setters
}

// User.java (Model)
package com.makeyourselfpretty.models;

import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String email;
    private String password;
    private String name;
    private String role; // customer, admin
    
    // Constructors, getters & setters
}