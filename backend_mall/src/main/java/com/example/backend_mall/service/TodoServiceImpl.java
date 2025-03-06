package com.example.backend_mall.service;

import com.example.backend_mall.dto.PageRequestDTO;
import com.example.backend_mall.dto.PageResponseDTO;
import com.example.backend_mall.dto.TodoDTO;
import com.example.backend_mall.entity.TodoEntity;
import com.example.backend_mall.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public void update(TodoDTO todoDTO) {
        TodoEntity todo = todoRepository.findById(todoDTO.getTno())
                .orElseThrow();
        todo.changeCompleted(todoDTO.isComplete());
        todo.changeTitle(todoDTO.getTitle());
        todoRepository.save(todo);
    }

    @Override
    public void remove(Long tno) {
        todoRepository.deleteById(tno);
    }

    @Override
    public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                // 1 페이지가 0이므로 주의
                pageRequestDTO.getPage() -1,
                pageRequestDTO.getSize(),
                Sort.by("tno").descending()
        );

        Page<TodoEntity> result = todoRepository.findAll(pageable);

        List<TodoDTO> dtoList = result.getContent().stream()
                .map(todo -> modelMapper.map(todo, TodoDTO.class))
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<TodoDTO> responseDTO = PageResponseDTO.<TodoDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();

        return responseDTO;
    }
}
