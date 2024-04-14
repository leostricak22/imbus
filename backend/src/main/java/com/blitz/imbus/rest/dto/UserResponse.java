package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.enums.CroatianCounty;
import com.blitz.imbus.domain.enums.Role;
import lombok.Builder;
import lombok.Data;
import org.aspectj.weaver.AjAttribute;

@Data
@Builder
public class UserResponse {
    private Integer id;
    private String name;
    private String surname;
    private String username;
    private CroatianCounty location;
}
