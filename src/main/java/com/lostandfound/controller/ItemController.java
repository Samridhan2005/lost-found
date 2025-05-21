package com.lostandfound.controller;

import com.lostandfound.model.Item;
import com.lostandfound.service.CloudinaryService;
import com.lostandfound.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private CloudinaryService cloudinaryService;

    // Helper method to convert String to Date
    private Date convertStringToDate(String dateStr) {
        if (dateStr == null || dateStr.isEmpty()) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // Adjust date format if needed
        try {
            return sdf.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/report")
    public Item reportItem(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("description") String description,
            @RequestParam("location") String location,
            @RequestParam(value = "dateReported", required = false) String dateReported,
            @RequestParam("image") MultipartFile imageFile
    ) throws IOException {
        // Upload image to Cloudinary and get the URL
        String imageUrl = cloudinaryService.uploadFile(imageFile);

        // Convert date string to Date object
        Date reportedDate = convertStringToDate(dateReported);

        // Create new Item object and populate fields
        Item item = new Item();
        item.setName(name);
        item.setCategory(category);
        item.setDescription(description);
        item.setLocation(location);
        item.setDateReported(reportedDate);
        item.setImageUrl(imageUrl);

        // Save item to DB
        return itemService.reportItem(item);
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }
}
