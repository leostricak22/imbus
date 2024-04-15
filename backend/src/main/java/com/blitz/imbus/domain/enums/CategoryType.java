package com.blitz.imbus.domain.enums;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
public enum CategoryType {
    VODOINSTALATERSKI_RADOVI("Vodoinstalaterski radovi"),
    STOLARSKI_RADOVI("Stolarski radovi"),
    SOBOSLIKARSKI_RADOVI("Soboslikarski radovi"),
    OSTALO("Ostalo");

    public final String name;

    CategoryType(String name) {
        this.name = name;
    }
}
