package com.nibm.mediappNew.repository;
import com.nibm.mediappNew.model.signup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SignupRepository extends JpaRepository<signup, Long> {
  Optional<signup> findByEmail(String email);
}
