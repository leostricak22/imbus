// controller for users with "client" role

package com.blitz.imbus.rest.controller;

import com.blitz.imbus.rest.dto.FilterRequest;
import com.blitz.imbus.rest.dto.ExpertsResponse;
import com.blitz.imbus.service.ExpertsService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client")
@AllArgsConstructor
public class ClientController {
    private final ExpertsService expertsService;

    @PostMapping("/all-experts-filter")
    public ResponseEntity<ExpertsResponse> allExperts (
            @Valid @RequestBody FilterRequest request // Executing function only if request data format is valid
    ) {
        return ResponseEntity.ok(expertsService.getExperts(request));
    }
}
