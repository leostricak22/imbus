package com.blitz.imbus.service;

import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.exception.ErrorCode;
import com.blitz.imbus.domain.models.Field;
import com.blitz.imbus.domain.models.Post;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.FieldRepository;
import com.blitz.imbus.repository.PostRepository;
import com.blitz.imbus.rest.dto.PostRequest;
import com.blitz.imbus.rest.dto.PostResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final FieldRepository fieldRepository;

    public List<PostResponse> getAllPosts() {
        List<Post> allPosts = postRepository.findAll();
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
        // creating a post from the request
        Post post = Post.builder()
                .created_at(System.currentTimeMillis())
                .creator_id(request.getCreator_id())
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
