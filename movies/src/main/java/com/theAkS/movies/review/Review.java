package com.theAkS.movies.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "reviews")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    private ObjectId id;
    private String body;
    private Integer rating;
    private String username; // Added anonymous username field
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    public Review(String body, Integer rating, String username) {
        this.body = body;
        this.rating = rating;
        this.username = username;
        this.createdAt = LocalDateTime.now();
    }
}