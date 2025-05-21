package com.lostandfound.repository;

import com.lostandfound.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {
    List<Item> findByCategory(String category);
    List<Item> findByType(String type); // ← Add this

}
