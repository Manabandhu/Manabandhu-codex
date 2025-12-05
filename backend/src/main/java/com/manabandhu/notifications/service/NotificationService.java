package com.manabandhu.notifications.service;

import com.manabandhu.notifications.dto.NotificationRequest;
import com.manabandhu.notifications.dto.NotificationResponse;
import java.util.List;

public interface NotificationService {
    List<NotificationResponse> list(String userId);
    NotificationResponse create(String userId, NotificationRequest request);
    NotificationResponse markRead(String id, String userId);
}
