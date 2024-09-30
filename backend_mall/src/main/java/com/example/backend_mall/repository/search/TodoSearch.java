package com.example.backend_mall.repository.search;

import com.example.backend_mall.entity.TodoEntity;
import org.springframework.data.domain.Page;

public interface TodoSearch {
    Page<TodoEntity> search1();
}
