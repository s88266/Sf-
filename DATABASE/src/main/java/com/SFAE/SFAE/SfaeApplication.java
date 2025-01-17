package com.SFAE.SFAE;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class SfaeApplication {

	public static void main(String[] args) {
		SpringApplication.run(SfaeApplication.class, args);
	}
}
