package com.theAkS.movies.dto;
import lombok.Value;
import java.time.LocalDateTime;

@Value
public class ReviewDto {
    String id;
    String body;
    Integer rating;
    String username; // Pass the username to the client
    LocalDateTime createdAt;
}