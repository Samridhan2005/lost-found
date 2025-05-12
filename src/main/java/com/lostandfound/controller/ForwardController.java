package com.lostandfound.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController {
    
    @RequestMapping(value = {"/register", "/login", "/"})
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}
