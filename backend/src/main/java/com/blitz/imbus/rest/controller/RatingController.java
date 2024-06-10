package com.blitz.imbus.rest.controller;

import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.exception.ErrorCode;
import com.blitz.imbus.domain.models.ChatMessage;
import com.blitz.imbus.domain.models.Rating;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.RatingRepository;
import com.blitz.imbus.rest.dto.UserRequest;
import com.blitz.imbus.service.AuthenticationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
public class RatingController {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/user")
    @ResponseBody
    public ResponseEntity<List<Rating>> getRatingsForUser(@RequestBody UserRequest userRequest) {
        User userToGetRatings = modelMapper.map(userRequest, User.class);

        System.out.println("imgettingids " + userRequest.getUsername() + " " + userToGetRatings.getUsername());

        return ResponseEntity.ok(ratingRepository.findAllByUserRatedUsername(userToGetRatings.getUsername()));
    }

    @PostMapping("/")
    @ResponseBody
    public ResponseEntity<Rating> addRatings(@RequestBody Rating ratedRequest) {
        Rating rating = modelMapper.map(ratedRequest, Rating.class);
        User loggedInUser = authenticationService.findUserBySessionUsername();

        rating.setUserRating(loggedInUser);

        if(ratingRepository.existsByUserRatedIdAndUserRatingId(rating.getUserRating().getId(), loggedInUser.getId()))
            throw new AppException(ErrorCode.CONFLICT);

        return ResponseEntity.ok(ratingRepository.save(rating));
    }
}
