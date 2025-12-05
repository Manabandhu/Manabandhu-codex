package com.manabandhu.config;

import java.net.URI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

@Configuration
public class RedisConfig {

    @Value("${spring.redis.url:redis://localhost:6379}")
    private String redisUrl;

    @Value("${spring.redis.token:}")
    private String redisToken;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        URI uri = URI.create(redisUrl);
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration(uri.getHost(), uri.getPort());
        if (uri.getUserInfo() != null && !uri.getUserInfo().isBlank()) {
            config.setUsername(uri.getUserInfo());
        }
        if (redisToken != null && !redisToken.isBlank()) {
            config.setPassword(redisToken);
        }

        LettuceClientConfiguration clientConfiguration = LettuceClientConfiguration.builder()
                .useSsl()
                .build();

        return new LettuceConnectionFactory(config, clientConfiguration);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        return template;
    }
}
