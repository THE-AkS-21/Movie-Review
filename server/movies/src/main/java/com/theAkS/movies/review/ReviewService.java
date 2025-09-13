package com.theAkS.movies.review;

import com.theAkS.movies.movie.MovieService;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MovieService movieService;

    public ReviewService(ReviewRepository reviewRepository, MovieService movieService) {
        this.reviewRepository = reviewRepository;
        this.movieService = movieService;
    }

    public Review createReview(String reviewBody, String imdbId) {
        Review review = new Review(reviewBody);
        reviewRepository.insert(review);
        movieService.addReviewToMovie(imdbId, review);
        return review;
    }
}