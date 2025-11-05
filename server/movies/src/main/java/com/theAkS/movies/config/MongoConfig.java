package com.theAkS.movies.config;

import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(
        // Scans ONLY movie/review packages
        basePackages = {"com.theAkS.movies.movie", "com.theAkS.movies.review"},
        mongoTemplateRef = "mongoTemplate"
)
public class MongoConfig {

    @Bean(name = "mongoProperties")
    @ConfigurationProperties(prefix = "spring.data.mongodb") // <-- Matches properties prefix
    public MongoProperties mongoProperties() {
        return new MongoProperties();
    }

    @Bean(name = "mongoClient")
    public MongoClient mongoClient(MongoProperties mongoProperties) {
        return MongoClients.create(mongoProperties.getUri());
    }

    @Bean(name = "mongoDatabaseFactory")
    public MongoDatabaseFactory mongoDatabaseFactory(MongoClient mongoClient, MongoProperties mongoProperties) {
        String database = mongoProperties.getDatabase();
        if (database == null) {
            database = new ConnectionString(mongoProperties.getUri()).getDatabase();
        }
        return new SimpleMongoClientDatabaseFactory(mongoClient, database);
    }

    @Bean(name = "mongoTemplate")
    public MongoTemplate mongoTemplate(MongoDatabaseFactory mongoDatabaseFactory) {
        return new MongoTemplate(mongoDatabaseFactory);
    }
}