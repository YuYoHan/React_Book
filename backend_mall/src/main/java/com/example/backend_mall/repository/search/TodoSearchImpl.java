package com.example.backend_mall.repository.search;

import com.example.backend_mall.entity.QTodoEntity;
import com.example.backend_mall.entity.TodoEntity;
import com.querydsl.jpa.JPQLQuery;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

@Log4j2
public class TodoSearchImpl extends QuerydslRepositorySupport implements TodoSearch {

    public TodoSearchImpl() {
        super(TodoEntity.class);
    }

    @Override
    public Page<TodoEntity> search1() {
        log.info("search1..........................");
        QTodoEntity todo = QTodoEntity.todoEntity;
        JPQLQuery<TodoEntity> query = from(todo);

        query.where(todo.title.contains("1"));

        Pageable pageable = PageRequest.of(1, 10, Sort.by("tno").descending());
        this.getQuerydsl().applyPagination(pageable, query);
        query.fetch();
        return null;
    }
}
