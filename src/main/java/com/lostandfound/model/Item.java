package com.lostandfound.model;

import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "items")
public class Item {

    // Fields for the item details
    private String name;
    private String category;
    private String description;
    private String location; // Added field for location
    
    // Date field to store the reported date
    private Date dateReported; // Added field for dateReported

    // Default constructor
    public Item() {
    }

    // Constructor with fields (optional)
    public Item(String name, String category, String description, String location, Date dateReported) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.location = location;
        this.dateReported = dateReported;
    }

    // Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getDateReported() {
        return dateReported;
    }

    public void setDateReported(Date dateReported) {
        this.dateReported = dateReported;
    }
}
