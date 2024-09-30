package com.example.backend_mall.repository;

import com.example.backend_mall.entity.TodoEntity;
import lombok.extern.log4j.Log4j2;
import org.assertj.core.api.Assert;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@SpringBootTest
@Log4j2
@TestPropertySource(locations = "classpath:application-test.yml")
public class TodoRepositoryTest {
    @Autowired
    private TodoRepository todoRepository;

    @Test
    void test1() {
        log.info("-------------------");
        log.info(todoRepository);
    }

    @Test
    void testInsert() {
        for (int i = 1; i <= 100; i++) {
            TodoEntity todo = TodoEntity.builder()
                    .title("Title" + i)
                    .dueDate(LocalDateTime.now())
                    .writer("user00")
                    .build();

            todoRepository.save(todo);
        }
    }

    @Test
    void testRead() {
        Long tno = 33L;
        TodoEntity todo = todoRepository.findById(tno).orElseThrow();
        log.info(todo);
    }

    @Test
    void testUpdate() {
        Long tno = 33L;
        TodoEntity todo = todoRepository.findById(tno).orElseThrow();
        log.info(todo);
        todo.changeTitle("ModifiedTitle 33...");
        todo.changeCompleted(true);
        todoRepository.save(todo);
    }

    @Test
    void testDelete() {
        Long tno = 33L;
        todoRepository.deleteById(tno);
    }

    @Test
    void testPaging() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("tno").descending());
        Page<TodoEntity> result = todoRepository.findAll(pageable);
        log.info(result.getTotalElements());
        result.getContent()
                .forEach(log::info);
    }

    @Test
    void testSearch1() {
        todoRepository.search1();

    }

}
