package com.example.backend_mall.repository;

import com.example.backend_mall.entity.ProductEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    @EntityGraph(attributePaths = "imageList")
    @Query("select p from ProductEntity p where p.pno = :pno")
    Optional<ProductEntity> selectOne(@Param("pno") Long pno);
}
