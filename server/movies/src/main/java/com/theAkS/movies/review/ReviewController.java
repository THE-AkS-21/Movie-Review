package com.theAkS.movies.review;

import com.theAkS.movies.dto.CreateReviewDto;
import com.theAkS.movies.dto.ReviewDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ReviewDto> createReview(@RequestBody CreateReviewDto payload) {
        Review createdReview = reviewService.createReview(payload.getReviewBody(), payload.getImdbId());
        return new ResponseEntity<>(new ReviewDto(createdReview.getBody()), HttpStatus.CREATED);
    }
}