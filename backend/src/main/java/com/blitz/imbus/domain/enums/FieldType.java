package com.blitz.imbus.domain.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

@Getter
public enum FieldType {
    VODOINSTALATERSKI_RADOVI("Vodoinstalaterski radovi"),
    STOLARSKI_RADOVI("Stolarski radovi"),
    SOBOSLIKARSKI_RADOVI("Soboslikarski radovi"),
    OSTALO("Ostalo");

    public final String name;

    FieldType(String name) {
        this.name = name;
    }
}
