// src/types/index.ts

// Based on the Review.java entity
export interface Review {
    body: string;
}

// Based on the Movie.java entity
export interface Movie {
    imdbID: string;
    title: string;
    releaseDate: string;
    trailerLink: string;
    poster: string;
    genres: string[];
    backdrops: string[];
    reviewIds: Review[];
}

export interface User {
    username: string;
    // Add other user properties as needed
}