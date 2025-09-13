-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
    id BIGSERIAL PRIMARY KEY,
    imdb_id VARCHAR(20) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    release_date VARCHAR(50),
    trailer_link VARCHAR(500),
    poster_url VARCHAR(500),
    plot TEXT,
    director VARCHAR(255),
    rating DECIMAL(3,1),
    duration VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create movie_genres table
CREATE TABLE IF NOT EXISTS movie_genres (
    movie_id BIGINT NOT NULL,
    genre VARCHAR(100) NOT NULL,
    PRIMARY KEY (movie_id, genre),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- Create movie_backdrops table
CREATE TABLE IF NOT EXISTS movie_backdrops (
    movie_id BIGINT NOT NULL,
    backdrop_url VARCHAR(500) NOT NULL,
    PRIMARY KEY (movie_id, backdrop_url),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- Create movie_cast table
CREATE TABLE IF NOT EXISTS movie_cast (
    movie_id BIGINT NOT NULL,
    actor VARCHAR(255) NOT NULL,
    PRIMARY KEY (movie_id, actor),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_movies_imdb_id ON movies(imdb_id);
CREATE INDEX IF NOT EXISTS idx_movies_title ON movies(title);
CREATE INDEX IF NOT EXISTS idx_movies_release_date ON movies(release_date);
CREATE INDEX IF NOT EXISTS idx_movies_rating ON movies(rating);
