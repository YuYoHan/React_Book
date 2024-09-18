package com.example.backend_mall.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@ToString
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TodoEntity {
    @Id @GeneratedValue
    private Long tno;
    private String title;
    private String writer;
    private boolean completed;
    private LocalDateTime dueDate;

    public void changeDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public void changeTitle(String title) {
        this.title = title;
    }

    public void changeCompleted(boolean completed) {
        this.completed = completed;
    }
}
