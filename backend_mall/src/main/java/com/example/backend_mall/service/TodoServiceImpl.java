package com.example.backend_mall.service;

import com.example.backend_mall.dto.TodoDTO;
import com.example.backend_mall.entity.TodoEntity;
import com.example.backend_mall.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService{

    private final ModelMapper modelMapper;
    private final TodoRepository todoRepository;

    @Override
    public Long register(TodoDTO todo) {
        TodoEntity todoEntity = modelMapper.map(todo, TodoEntity.class);
        TodoEntity savedTodo = todoRepository.save(todoEntity);
        return savedTodo.getTno();
    }

    @Override
    public TodoDTO get(Long tno) {
        TodoEntity todo = todoRepository.findById(tno)
                .orElseThrow();
        return modelMapper.map(todo, TodoDTO.class);
    }
}
