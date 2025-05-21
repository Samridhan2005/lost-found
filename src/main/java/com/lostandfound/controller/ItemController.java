package com.lostandfound.controller;

import com.lostandfound.model.Item;
import com.lostandfound.repository.ItemRepository;
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

    @Autowired
    private ItemRepository itemRepository; // Inject repo here

    // ✅ GET /items/found
    @GetMapping("/found")
    public List<Item> getFoundItems() {
        return itemRepository.findByType("found");
    }

    // ✅ GET /items/lost
    @GetMapping("/lost")
    public List<Item> getLostItems() {
        return itemRepository.findByType("lost");
    }

    // Helper method to convert String to Date
    private Date convertStringToDate(String dateStr) {
        if (dateStr == null || dateStr.isEmpty()) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return sdf.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    // POST /items/report
    @PostMapping("/report")
    public Item reportItem(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("type") String type,
            @RequestParam("description") String description,
            @RequestParam("location") String location,
            @RequestParam(value = "dateReported", required = false) String dateReported,
            @RequestParam("image") MultipartFile imageFile
    ) throws IOException {
        String imageUrl = cloudinaryService.uploadFile(imageFile);
        Date reportedDate = convertStringToDate(dateReported);

        Item item = new Item();
        item.setName(name);
        item.setCategory(category);
        item.setType(type);
        item.setDescription(description);
        item.setLocation(location);
        item.setDateReported(reportedDate);
        item.setImageUrl(imageUrl);

        return itemService.reportItem(item);
    }


    // GET /items
    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }
}
