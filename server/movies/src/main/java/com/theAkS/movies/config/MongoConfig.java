package com.theAkS.movies.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = {"com.theAkS.movies.movie", "com.theAkS.movies.review"})
public class MongoConfig {
}