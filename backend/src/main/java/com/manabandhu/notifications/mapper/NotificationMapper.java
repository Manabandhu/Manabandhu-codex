package com.manabandhu.notifications.mapper;

import com.manabandhu.notifications.dto.NotificationRequest;
import com.manabandhu.notifications.dto.NotificationResponse;
import com.manabandhu.notifications.entity.Notification;

public final class NotificationMapper {
    private NotificationMapper() {}

    public static NotificationResponse toResponse(Notification entity) {
        return new NotificationResponse(
                entity.getId(),
                entity.getUserId(),
                entity.getType(),
                entity.getPayload(),
                entity.isRead(),
                entity.getCreatedAt()
        );
    }

    public static void apply(Notification entity, NotificationRequest request) {
        entity.setType(request.type());
        entity.setPayload(request.payload());
    }
}
