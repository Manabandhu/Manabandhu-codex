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

        String host = uri.getHost();
        int port = uri.getPort();
        String scheme = uri.getScheme();

        // If no port provided, pick a sensible default depending on scheme
        if (port == -1) {
            if ("https".equalsIgnoreCase(scheme) || "rediss".equalsIgnoreCase(scheme)) {
                port = 443;
            } else {
                port = 6379;
            }
        }

        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration(host, port);

        if (uri.getUserInfo() != null && !uri.getUserInfo().isBlank()) {
            // userInfo may contain 'user:pass' — use username only here
            String userInfo = uri.getUserInfo();
            String username = userInfo.split(":", 2)[0];
            config.setUsername(username);
        }
        if (redisToken != null && !redisToken.isBlank()) {
            config.setPassword(redisToken);
        }

        boolean useSsl = "https".equalsIgnoreCase(scheme) || "rediss".equalsIgnoreCase(scheme) || redisUrl.startsWith("rediss:");

        LettuceClientConfiguration.LettuceClientConfigurationBuilder clientBuilder = LettuceClientConfiguration.builder();
        if (useSsl) {
            clientBuilder.useSsl();
        }

        LettuceClientConfiguration clientConfiguration = clientBuilder.build();

        return new LettuceConnectionFactory(config, clientConfiguration);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        return template;
    }
}
