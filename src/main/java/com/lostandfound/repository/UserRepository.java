package com.lostandfound.repository;

import com.lostandfound.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    // Define a method to find a user by email
    Optional<User> findByEmail(String email);  // This is the key method
}
