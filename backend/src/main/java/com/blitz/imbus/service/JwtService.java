package com.blitz.imbus.service;

import com.blitz.imbus.config.EnvConfig;
import com.blitz.imbus.domain.exception.AppException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.security.SignatureException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

import static com.blitz.imbus.domain.exception.ErrorCode.UNAUTHORIZED;

@Service
public class JwtService {
    @Autowired
    private EnvConfig envConfig;

    // extracting username from the jwt
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // generating jwt with basic details
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // getting a username from the session
    public String getUsernameFromSession() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }

    // building the jwt
    public String generateToken(
        Map<String, Object> extraClaims,
        UserDetails userDetails
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())  // set username in token payload
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24)) // token is valid for 24 hours + 1000 miliseconds
                .signWith(getSignInKey(), SignatureAlgorithm.HS256) // HS256 algorithm
                .compact();
    }

    //checking if jwt is valid
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token); // check if username matches and the exiration date
    }

    // check if jwt is expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // extracting date from jwt
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);

        // claimsResolver function extracts a specific claim
        return claimsResolver.apply(claims);
    }

    // extract all claims from the jwt
    private Claims extractAllClaims(String token) {
        return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    // creates a signing key from the secret
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(envConfig.getSECRET_KEY());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
