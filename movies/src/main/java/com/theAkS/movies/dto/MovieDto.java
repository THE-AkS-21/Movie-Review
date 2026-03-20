package com.theAkS.movies.dto;

import lombok.Value;
import java.util.List;

@Value
public class MovieDto {
    private String imdbID;
    private String title;
    private String releaseDate;
    private String trailerLink;
    private String poster;
    private List<String> genre;
    private List<String> backdrop;
    private List<ReviewDto> reviews;
}