package com.example.backend_mall.service;

import com.example.backend_mall.dto.PageRequestDTO;
import com.example.backend_mall.dto.PageResponseDTO;
import com.example.backend_mall.dto.TodoDTO;
import com.example.backend_mall.entity.TodoEntity;

public interface TodoService {
    Long register(TodoDTO todo);
    TodoDTO get(Long tno);
    void update(TodoDTO todo);
    void remove(Long tno);
    PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO);
}
