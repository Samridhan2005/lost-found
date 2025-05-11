package com.lostandfound.controller;  // This matches the package structure

import org.springframework.web.bind.annotation.GetMapping;  // Import to handle HTTP GET requests
import org.springframework.web.bind.annotation.RestController;  // Import to mark this as a REST controller

@RestController  // This annotation tells Spring this is a RESTful controller
public class HomeController {

    // This method handles requests to the root URL "/"
    @GetMapping("/")  // This annotation maps the root URL "/" to this method
    public String home() {
        // When a request is made to "/", this message will be returned
        return "Welcome to the Lost and Found Platform!";
    }
}
