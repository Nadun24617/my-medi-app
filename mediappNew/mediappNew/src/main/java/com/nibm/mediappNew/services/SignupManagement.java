package com.nibm.mediappNew.services;

import com.nibm.mediappNew.model.signup;
import com.nibm.mediappNew.repository.SignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignupManagement {

    @Autowired
    private SignupRepository signupRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public signup registerNewUser(signup Signup) throws Exception {
        if (signupRepository.findByEmail(Signup.getEmail()).isPresent()) {
            throw new Exception("Email already exists");
        }
        Signup.setPassword(passwordEncoder.encode(Signup.getPassword()));
        return signupRepository.save(Signup);
    }

    public signup findUserByEmail(String email) throws Exception {
        return signupRepository.findByEmail(email).orElse(null);
    }
}
