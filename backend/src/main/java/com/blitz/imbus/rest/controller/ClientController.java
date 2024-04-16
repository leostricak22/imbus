package com.blitz.imbus.rest.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

