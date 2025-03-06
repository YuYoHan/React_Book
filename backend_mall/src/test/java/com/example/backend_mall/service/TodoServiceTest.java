package com.example.backend_mall.service;

import com.example.backend_mall.dto.PageRequestDTO;
import com.example.backend_mall.dto.PageResponseDTO;
import com.example.backend_mall.dto.TodoDTO;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Log4j2
public class TodoServiceTest {
    @Autowired
    private TodoService todoService;

    @Test
    void testGet() {
        Long tno = 102L;
        TodoDTO todoDTO = todoService.get(tno);
        log.info(todoDTO);
    }

    @Test
    void testUpdate() {
        TodoDTO todoDTO = todoService.get(2L);
        todoService.update(todoDTO);
    }

    @Test
    void testDelete() {
        todoService.remove(2L);
    }

    @Test
    void testList() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(2)
                .size(10)
                .build();

        PageResponseDTO<TodoDTO> response = todoService.list(pageRequestDTO);
        log.debug(response);
    }
}
