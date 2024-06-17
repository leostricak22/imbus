package com.blitz.imbus.rest.controller;

import com.blitz.imbus.domain.models.Comment;
import com.blitz.imbus.domain.models.SmallFixes;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.CommentRepository;
import com.blitz.imbus.repository.SmallFixesRepository;
import com.blitz.imbus.repository.UserRepository;
import com.blitz.imbus.rest.dto.CommentRequest;
import com.blitz.imbus.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private SmallFixesRepository smallFixesRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/")
    public ResponseEntity<Comment> addComment(@Valid @RequestBody CommentRequest commentRequest) {
        SmallFixes smallFix = smallFixesRepository.findById(commentRequest.getSmallFixId()).orElse(null);
        User user = authenticationService.findUserBySessionUsername();

        if (smallFix == null || user == null) {
            return ResponseEntity.badRequest().build();
        }

        Comment comment = Comment.builder()
                .smallFix(smallFix)
                .user(user)
                .description(commentRequest.getDescription())
                .build();

        commentRepository.save(comment);

        return ResponseEntity.ok(comment);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{smallFixId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Integer smallFixId) {
        List<Comment> comments = commentRepository.findAllBySmallFixId(smallFixId);
        return ResponseEntity.ok(comments);
    }
}