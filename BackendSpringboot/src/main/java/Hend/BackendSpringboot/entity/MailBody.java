package Hend.BackendSpringboot.entity;


import lombok.Builder;

@Builder
public record MailBody(String to, String subject, String text) {
}
