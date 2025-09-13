package com.theAkS.movies.review;

import com.theAkS.movies.movie.Movie;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MongoTemplate mongoTemplate; // Use MongoTemplate for complex updates

    public Review createReview(String reviewBody, String imdbId) {
        // Create and insert the new review, which generates its ID
        Review review = reviewRepository.insert(new Review(reviewBody));

        // Use MongoTemplate to update the Movie document by pushing the new review
        // into the reviewIds array.
        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbID").is(imdbId))
                .apply(new Update().push("reviewIds").value(review))
                .first();

        return review;
    }
}