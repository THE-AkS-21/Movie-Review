package com.theAkS.movies.review;

import com.theAkS.movies.dto.CreateReviewDto;
import com.theAkS.movies.dto.ReviewDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ReviewDto> createReview(@RequestBody CreateReviewDto payload, Principal principal) {
        // Principal is injected by our RedisSessionFilter!
        Review createdReview = reviewService.createReview(
                payload.getReviewBody(),
                payload.getImdbId(),
                payload.getRating(),
                principal.getName() // Pass the actual logged-in username
        );

        return new ResponseEntity<>(new ReviewDto(
                createdReview.getId().toHexString(),
                createdReview.getBody(),
                createdReview.getRating(),
                createdReview.getUsername(),
                createdReview.getCreatedAt()
        ), HttpStatus.CREATED);
    }
}