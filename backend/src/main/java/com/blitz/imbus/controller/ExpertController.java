// controller for users with "expert" role

package com.blitz.whatsdown.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expert")
public class ExpertController {
    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Pozdrav znalcu");
    }
}
