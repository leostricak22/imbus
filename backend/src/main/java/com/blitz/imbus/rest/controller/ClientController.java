package com.blitz.imbus.rest.controller;

import com.blitz.imbus.rest.dto.FilterRequest;
import com.blitz.imbus.rest.dto.UserResponse;
import com.blitz.imbus.service.ExpertsService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/client")
public class ClientController {
    @GetMapping("/")
    @PreAuthorize("hasAuthority('CLIENT')")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Pozdrav korisniku");
    }
}

