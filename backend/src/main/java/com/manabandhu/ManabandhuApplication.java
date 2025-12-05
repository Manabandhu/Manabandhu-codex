package com.manabandhu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class ManabandhuApplication {
    public static void main(String[] args) {
        SpringApplication.run(ManabandhuApplication.class, args);
    }
}
