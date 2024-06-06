package com.blitz.imbus.rest.controller;

import com.blitz.imbus.rest.dto.OfferResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/test")
public class TestController {
    @GetMapping
    public ResponseEntity<?> test() {
        return ResponseEntity.ok("test");
    }
}
