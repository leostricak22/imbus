package com.blitz.imbus.domain.enums;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

public enum CategoryType {
    VODOINSTALATERSKI_RADOVI,
    STOLARSKI_RADOVI,
    SOBOSLIKARSKI_RADOVI,
    OSTALO;
}
