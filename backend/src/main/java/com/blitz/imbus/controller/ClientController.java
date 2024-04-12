// controller for users with "client" role

package com.blitz.whatsdown.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client")
public class ClientController {
    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Poz obicnom korisniku");
    }
}
