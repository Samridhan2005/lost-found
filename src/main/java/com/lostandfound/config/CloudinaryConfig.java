package com.lostandfound.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dlmjxye1m",
                "api_key", "754129247645988",
                "api_secret", "nnDZz4FKbVrlJFgZe6tZhAEs8cM"
        ));
    }
}
