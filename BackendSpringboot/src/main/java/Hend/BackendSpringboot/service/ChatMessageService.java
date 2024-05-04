package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.ChatMessage;
import Hend.BackendSpringboot.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;

    public ChatMessage save(ChatMessage chatMessage) {
        return chatMessageRepository.save(chatMessage);
    }


    public List<ChatMessage> getAllMessages() {
        return chatMessageRepository.findAll();
    }
}