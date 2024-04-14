package com.blitz.imbus.service;

import com.blitz.imbus.domain.models.Field;
import com.blitz.imbus.domain.models.Post;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.FieldRepository;
import com.blitz.imbus.repository.PostRepository;
import com.blitz.imbus.rest.dto.PostRequest;
import com.blitz.imbus.rest.dto.PostResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final FieldRepository fieldRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public PostResponse addPost(PostRequest request) {
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

        postRepository.save(post);

        // adding fields into database
        List<Field> allFields = post.getFields();
        for (Field field : allFields) {
            field.setPost(Post.builder()
                    .id(post.getId())
                    .build());

            fieldRepository.save(field);
        }

        return new PostResponse();
    }
}
