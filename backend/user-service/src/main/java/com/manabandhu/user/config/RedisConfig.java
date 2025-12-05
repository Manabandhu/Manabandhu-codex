package com.manabandhu.user.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

import java.net.URI;

@Configuration
public class RedisConfig {
    private final String redisUrl;
    private final String redisToken;

    public RedisConfig(@Value("${UPSTASH_REDIS_URL}") String redisUrl,
                       @Value("${UPSTASH_REDIS_TOKEN}") String redisToken) {
        this.redisUrl = redisUrl;
        this.redisToken = redisToken;
    }

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        URI uri = URI.create(redisUrl);
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration(uri.getHost(), uri.getPort());
        config.setPassword(redisToken);
        LettuceClientConfiguration clientConfiguration = LettuceClientConfiguration.builder().useSsl().build();
        return new LettuceConnectionFactory(config, clientConfiguration);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        return template;
    }
}
