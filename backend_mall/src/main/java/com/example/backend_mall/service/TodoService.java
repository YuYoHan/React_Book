package com.example.backend_mall.service;

import com.example.backend_mall.dto.TodoDTO;
import com.example.backend_mall.entity.TodoEntity;

public interface TodoService {
    Long register(TodoDTO todo);
}
