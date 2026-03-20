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
    private final MongoTemplate mongoTemplate;

    public Review createReview(String reviewBody, String imdbId, Integer rating, String username) {
        // Use the authenticated username
        Review review = reviewRepository.insert(new Review(reviewBody, rating, username));

        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbID").is(imdbId))
                .apply(new Update().push("reviewIds").value(review))
                .first();

        return review;
    }
}