package com.manabandhu.room.config;

import com.meilisearch.sdk.Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MeiliConfig {

    @Bean
    public Client meiliClient(@Value("${meilisearch.host}") String host, @Value("${meilisearch.apiKey}") String key) {
        return new Client(host, key);
    }
}
