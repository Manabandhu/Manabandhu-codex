package com.manabandhu.notifications.service;

import com.manabandhu.common.exceptions.NotFoundException;
import com.manabandhu.common.exceptions.UnauthorizedException;
import com.manabandhu.notifications.dto.NotificationRequest;
import com.manabandhu.notifications.dto.NotificationResponse;
import com.manabandhu.notifications.entity.Notification;
import com.manabandhu.notifications.mapper.NotificationMapper;
import com.manabandhu.notifications.repository.NotificationRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository repository;

    public NotificationServiceImpl(NotificationRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<NotificationResponse> list(String userId) {
        ensureUser(userId);
        return repository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(NotificationMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public NotificationResponse create(String userId, NotificationRequest request) {
        ensureUser(userId);
        Notification entity = new Notification();
        entity.setUserId(userId);
        NotificationMapper.apply(entity, request);
        return NotificationMapper.toResponse(repository.save(entity));
    }

    @Override
    @Transactional
    public NotificationResponse markRead(String id, String userId) {
        ensureUser(userId);
        Notification entity = repository.findById(id).orElseThrow(() -> new NotFoundException("Notification not found"));
        if (!entity.getUserId().equals(userId)) {
            throw new NotFoundException("Notification not found");
        }
        entity.setRead(true);
        return NotificationMapper.toResponse(repository.save(entity));
    }

    private void ensureUser(String userId) {
        if (userId == null) {
            throw new UnauthorizedException("Authentication required");
        }
    }
}
