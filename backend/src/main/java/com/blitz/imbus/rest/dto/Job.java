package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.models.Ad;
import lombok.Data;

@Data
public class Job {
    private String date;
    private Ad ad;
}
