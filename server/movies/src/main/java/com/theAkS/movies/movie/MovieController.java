package com.theAkS.movies.movie;

import com.theAkS.movies.dto.MovieDto;
import com.theAkS.movies.dto.ReviewDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public ResponseEntity<List<MovieDto>> getAllMovies() {
        List<MovieDto> movieDtos = movieService.allMovies().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(movieDtos);
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<MovieDto> getSingleMovie(@PathVariable String imdbId) {
        return movieService.singleMovie(imdbId)
                .map(this::convertToDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private MovieDto convertToDto(Movie movie) {
        List<ReviewDto> reviewDtos = movie.getReviewIds().stream()
                .map(review -> new ReviewDto(review.getBody()))
                .collect(Collectors.toList());

        return new MovieDto(
                movie.getImdbID(),
                movie.getTitle(),
                movie.getReleaseDate(),
                movie.getTrailerLink(),
                movie.getPoster(),
                movie.getGenre(),
                movie.getBackdrop(),
                reviewDtos
        );
    }
}