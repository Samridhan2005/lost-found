package com.lostandfound.model;

import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "items")
public class Item {

    private String name;
    private String category;
    private String description;
    private String location;
    private Date dateReported;

    // 🔹 New field to store Cloudinary image URL
    private String imageUrl;

    public Item() {
    }

    public Item(String name, String category, String description, String location, Date dateReported, String imageUrl) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.location = location;
        this.dateReported = dateReported;
        this.imageUrl = imageUrl;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
