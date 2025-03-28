package com.example.backend_mall.repository;

import com.example.backend_mall.entity.TodoEntity;
import com.example.backend_mall.repository.search.TodoSearch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<TodoEntity, Long>, TodoSearch {

}
