package com.manabandhu.chat.repository;

import com.manabandhu.chat.entity.ChatMessage;
import org.springframework.data.repository.CrudRepository;

public interface ChatMessageRepository extends CrudRepository<ChatMessage, String> {}
