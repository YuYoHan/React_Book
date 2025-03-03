package com.example.backend_mall.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoDTO {
    private Long tno;
    private String title;
    private String writer;
    private boolean complete;

    // 2024-09-11 이런식으로 포맷이 구성됨
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dueDate;
}
