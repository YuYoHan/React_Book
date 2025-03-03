package com.example.backend_mall.controller.todo;

import com.example.backend_mall.dto.TodoDTO;
import com.example.backend_mall.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping("/")
    public Map<String, Long> register(@RequestBody TodoDTO todo) {
        log.info(todo);
        Long register = todoService.register(todo);
        return Map.of("register",register);
    }

    @PutMapping("/{tno}")
    public ResponseEntity<?> update(@PathVariable Long tno, @RequestBody TodoDTO todo) {
        todoService.update(todo);
        return ResponseEntity.ok().body("success");
    }

    @DeleteMapping("/{tno}")
    public ResponseEntity<?> delete(@PathVariable Long tno) {
        todoService.remove(tno);
        return ResponseEntity.ok().body("success");
    }

}
