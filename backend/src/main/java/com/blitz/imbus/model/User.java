package com.blitz.whatsdown.model;

import com.blitz.whatsdown.repository.RoleRepository;
import com.blitz.whatsdown.validation.PasswordValidate;
import com.blitz.whatsdown.validation.RoleIdExists;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.Collections;

import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String surname;

    private String username;

    private String email;

    private Boolean active;

    private Timestamp created_at;

    private String password;

    private Integer role;

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // giving user the role
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.role));
    }
}
