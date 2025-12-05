package com.manabandhu.chat.entity;

import com.manabandhu.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "chat_message")
public class ChatMessage extends BaseEntity {
    @Column(name = "room_id", nullable = false)
    private String roomId;
    @Column(name = "sender_id")
    private String senderId;
    private String content;

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
