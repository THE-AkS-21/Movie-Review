package com.theAkS.movies.movie;

import com.theAkS.movies.review.Review;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> allMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> singleMovie(String imdbId) {
        return movieRepository.findMovieByImdbID(imdbId);
    }

    public void addReviewToMovie(String imdbId, Review review) {
        movieRepository.findMovieByImdbID(imdbId).ifPresent(movie -> {
            movie.getReviewIds().add(review);
            movieRepository.save(movie);
        });
    }
}