package com.theAkS.movies.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final StringRedisTemplate redisTemplate;

    public String register(String username, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        userRepository.save(new User(null, username, password));
        return "User registered successfully";
    }

    public String login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = UUID.randomUUID().toString();
        // Prefix with "movie:session" to keep things clean
        redisTemplate.opsForValue().set("movie:session:" + token, user.getUsername(), Duration.ofDays(7));
        return token;
    }

    public void logout(String token) {
        redisTemplate.delete("movie:session:" + token);
    }
}