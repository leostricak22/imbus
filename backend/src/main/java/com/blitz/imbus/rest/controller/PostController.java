package com.blitz.imbus.rest.controller;

import com.blitz.imbus.domain.enums.Role;
import com.blitz.imbus.domain.models.Post;
import com.blitz.imbus.rest.dto.PostRequest;
import com.blitz.imbus.rest.dto.PostResponse;
import com.blitz.imbus.service.PostService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/post")
public class PostController {
    private final PostService postService;

    @GetMapping("/get-all-posts")
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/get-specific-post/{id}")
    public ResponseEntity<PostResponse> getAllPosts(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(postService.getSpecificPost(id));
    }

    @PostMapping("/add-post")
    public ResponseEntity<PostResponse> addPost(
            @Valid @RequestBody PostRequest request // Executing function only if request data format is valid
    ) {
        return ResponseEntity.ok(postService.addPost(request));
    }
}
