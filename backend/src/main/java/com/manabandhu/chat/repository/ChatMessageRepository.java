package com.manabandhu.chat.repository;

import com.manabandhu.chat.entity.ChatMessage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    List<ChatMessage> findByRoomIdOrderByCreatedAtAsc(String roomId);
}
