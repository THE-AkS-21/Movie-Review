package com.theAkS.movies.dto;

import lombok.Value;

@Value
public class CreateReviewDto {
    String reviewBody;
    String imdbId;
}