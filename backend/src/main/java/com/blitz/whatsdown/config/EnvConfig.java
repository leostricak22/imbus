package com.blitz.whatsdown.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Setter
@Getter
@Configuration
@PropertySource("classpath:.env")   // .env file location
@ConfigurationProperties(prefix = "myconfig")   // "package" of env variables
public class EnvConfig {
    private String SECRET_KEY;  // jwt token secret key
}
