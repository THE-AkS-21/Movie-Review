package com.theAkS.movies.movie;

import com.theAkS.movies.review.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "movies")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
    @Id
    private ObjectId id;
    private String imdbID;
    private String title;
    private String releaseDate;
    private String trailerLink;
    private String poster;

    // ✅ Initialize all list fields to prevent NullPointerExceptions
    @Builder.Default
    private List<String> genres = new ArrayList<>();

    @Builder.Default
    private List<String> backdrops = new ArrayList<>();

    @DocumentReference
    @Builder.Default
    private List<Review> reviewIds = new ArrayList<>();
}