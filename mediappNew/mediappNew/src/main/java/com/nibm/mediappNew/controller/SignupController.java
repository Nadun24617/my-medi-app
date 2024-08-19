package com.nibm.mediappNew.controller;

import com.nibm.mediappNew.model.signup;
import com.nibm.mediappNew.services.SignupManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class SignupController {

    @Autowired
    private SignupManagement signupManagement;

    @GetMapping("/signup")
    public String showSignupForm() {
        return "signup";
    }

    @PostMapping("/signup")
    public String signup(@ModelAttribute signup Signup) {
        try {
            signupManagement.registerNewUser(Signup);
            return "redirect:/login";
        } catch (Exception e) {
            return "signup?error=" + e.getMessage();  // Added '=' to correctly pass the error message
        }
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }
}
