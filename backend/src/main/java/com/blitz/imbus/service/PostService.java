package com.blitz.imbus.service;

import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.exception.ErrorCode;
import com.blitz.imbus.domain.models.Field;
import com.blitz.imbus.domain.models.Post;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.FieldRepository;
import com.blitz.imbus.repository.PostRepository;
import com.blitz.imbus.repository.UserRepository;
import com.blitz.imbus.rest.dto.PostRequest;
import com.blitz.imbus.rest.dto.PostResponse;
import com.blitz.imbus.rest.dto.UserResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final FieldRepository fieldRepository;

    private final JwtService jwtService;

    // getting all posts
    public List<PostResponse> getAllPosts() {
        List<Post> allPosts = postRepository.findAll();

        // create a response
        List<PostResponse> allPostResponses = new ArrayList<>();
        for (Post allPost : allPosts) {
            allPostResponses.add(getSpecificPost(allPost.getId()));
        }

        return allPostResponses;
    }

    // getting specific post by id
    public PostResponse getSpecificPost(Integer id) {
        // find post by id
        Optional<Post> post = postRepository.findById(id);

        // if post doesn't exist, throw an error
        if(post.isEmpty())
            throw new AppException(ErrorCode.BAD_REQUEST);

        // creating a response
        return PostResponse.builder()
                .id(post.get().getId())
                .creator(UserResponse.builder()
                        .id(post.get().getCreator().getId())
                        .username(post.get().getCreator().getUsername())
                        .name(post.get().getCreator().getName())
                        .surname(post.get().getCreator().getSurname())
                        .location(post.get().getCreator().getLocation())
                        .fields(post.get().getCreator().getFields())
                        .build())
                .title(post.get().getTitle())
                .description(post.get().getDescription())
                .doTheJobFrom(post.get().getDoTheJobFrom())
                .doTheJobTo(post.get().getDoTheJobTo())
                .fields(post.get().getFields())
                .location(post.get().getLocation())
                .build();
    }

    // adding a post into the database
    public PostResponse addPost(PostRequest request) {
        Optional<User> loggedInUser = userRepository.findByUsername(jwtService.getUsernameFromSession());
        if(loggedInUser.isEmpty())
            throw new AppException(ErrorCode.BAD_REQUEST);

        // creating a post from the request
        Post post = Post.builder()
                .created_at(System.currentTimeMillis())
                .creator(loggedInUser.get())
                .title(request.getTitle())
                .description(request.getDescription())
                .doTheJobFrom(request.getDoTheJobFrom())
                .doTheJobTo(request.getDoTheJobTo())
                .location(request.getLocation())
                .fields(request.getFields())
                .build();

        // adding post to database
        postRepository.save(post);

        // adding fields into database
        List<Field> allFields = post.getFields();
        for (Field field : allFields) {
            field.setPost(Post.builder()
                    .id(post.getId())
                    .build());

            fieldRepository.save(field);
        }

        // returning the created object
        return getSpecificPost(post.getId());
    }
}
