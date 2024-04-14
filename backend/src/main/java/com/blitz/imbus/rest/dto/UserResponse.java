package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.enums.CroatianCounty;
import com.blitz.imbus.domain.enums.Role;
import com.blitz.imbus.domain.models.Field;
import lombok.Builder;
import lombok.Data;
import org.aspectj.weaver.AjAttribute;

import java.util.List;

@Data
@Builder
public class UserResponse {
    private Integer id;
    private String name;
    private String surname;
    private String username;
    private CroatianCounty location;
    private List<Field> fields;
}
