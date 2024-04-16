package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.models.Ad;
import com.blitz.imbus.domain.models.User;
import lombok.Data;

@Data
public class OfferResponse {
    private Integer id;

    private UserResponse user;

    private AdResponse ad;

    private Float price;
}
