package com.blitz.imbus.rest.controller;

import com.blitz.imbus.domain.models.SmallFixes;
import com.blitz.imbus.rest.dto.AdResponse;
import com.blitz.imbus.rest.dto.FilterRequest;
import com.blitz.imbus.service.SmallFixesService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/smallfixes")
public class SmallFixesController {
    private final SmallFixesService smallFixesService;

    @GetMapping("/")
    public ResponseEntity<List<SmallFixes>> getAllSmallFixes() {
        return ResponseEntity.ok(smallFixesService.getSmallFixesFilter(new FilterRequest()));
    }


    @PreAuthorize("hasAuthority('CLIENT')")
    @PostMapping("/add")
    public ResponseEntity<SmallFixes> addSmallFixes(
            @RequestParam("attachments") List<MultipartFile> attachments,
            @RequestParam("smallfixes") String smallFixesRequest
    ) {
        return ResponseEntity.ok(smallFixesService.addSmallFixes(attachments, smallFixesRequest));
    }
}
