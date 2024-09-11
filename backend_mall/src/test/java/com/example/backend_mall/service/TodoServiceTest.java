package com.example.backend_mall.service;

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
}
