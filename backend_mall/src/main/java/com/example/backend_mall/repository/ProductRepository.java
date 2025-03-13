package com.example.backend_mall.repository;

import com.example.backend_mall.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    @EntityGraph(attributePaths = "imageList")
    @Query("select p from ProductEntity p where p.pno = :pno")
    Optional<ProductEntity> selectOne(@Param("pno") Long pno);

    @Modifying
    @Query("update ProductEntity p set p.delFlag = :flag where p.pno = :pno")
    void updateToDelete(@Param("pno") Long pno, @Param("flag") boolean flag);

    @Query("select p, pi from  ProductEntity p left join p.imageList pi " +
            "where pi.ord = 0 and p.delFlag = false ")
    Page<Object[]> selectList(Pageable pageable);
}
