package com.theAkS.movies.auth;

import com.theAkS.movies.auth.dto.AuthResponse;
import com.theAkS.movies.auth.dto.LoginRequest;
import com.theAkS.movies.auth.dto.RegisterRequest;
import com.theAkS.movies.exception.ResourceNotFoundException;
import com.theAkS.movies.user.Role;
import com.theAkS.movies.user.RoleRepository;
import com.theAkS.movies.user.User;
import com.theAkS.movies.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthService {
    
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    
    public AuthResponse login(LoginRequest loginRequest) {
        log.info("Attempting login for user: {}", loginRequest.getUsername());
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        User user = userRepository.findByUsernameWithRoles(loginRequest.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        LocalDateTime expiresAt = LocalDateTime.ofInstant(
                jwtUtils.getExpirationDateFromToken(jwt).toInstant(),
                ZoneId.systemDefault()
        );
        
        log.info("User {} logged in successfully", user.getUsername());
        return AuthResponse.fromUser(user, jwt, expiresAt);
    }
    
    public AuthResponse register(RegisterRequest registerRequest) {
        log.info("Attempting registration for user: {}", registerRequest.getUsername());
        
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }
        
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }
        
        // Create new user
        User user = User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .isActive(true)
                .isEmailVerified(false)
                .build();
        
        // Set default role
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(Role.RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        user.setRoles(roles);
        
        User savedUser = userRepository.save(user);
        log.info("User {} registered successfully", savedUser.getUsername());
        
        // Auto-login after registration
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        registerRequest.getUsername(),
                        registerRequest.getPassword()
                )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        LocalDateTime expiresAt = LocalDateTime.ofInstant(
                jwtUtils.getExpirationDateFromToken(jwt).toInstant(),
                ZoneId.systemDefault()
        );
        
        return AuthResponse.fromUser(savedUser, jwt, expiresAt);
    }
    
    public AuthResponse refreshToken(String token) {
        if (!jwtUtils.validateJwtToken(token)) {
            throw new RuntimeException("Invalid token");
        }
        
        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsernameWithRoles(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        String newJwt = jwtUtils.generateTokenFromUsername(username);
        
        LocalDateTime expiresAt = LocalDateTime.ofInstant(
                jwtUtils.getExpirationDateFromToken(newJwt).toInstant(),
                ZoneId.systemDefault()
        );
        
        return AuthResponse.fromUser(user, newJwt, expiresAt);
    }
    
    public void logout(String token) {
        // In a more sophisticated implementation, you might want to blacklist the token
        // For now, we'll just log the logout
        String username = jwtUtils.getUserNameFromJwtToken(token);
        log.info("User {} logged out", username);
    }
    
    public boolean verifyToken(String token) {
        return jwtUtils.validateJwtToken(token) && !jwtUtils.isTokenExpired(token);
    }
    
    public User getCurrentUser(String token) {
        String username = jwtUtils.getUserNameFromJwtToken(token);
        return userRepository.findByUsernameWithRoles(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
