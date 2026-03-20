package com.theAkS.movies;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test") // This tells Spring to use your application-test.properties
class MoviesApplicationTests {

    @Test
    void contextLoads() {
    }

}