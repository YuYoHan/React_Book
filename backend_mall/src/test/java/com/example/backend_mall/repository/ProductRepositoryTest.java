package com.example.backend_mall.repository;

import com.example.backend_mall.entity.ProductEntity;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
@ActiveProfiles("test")
class ProductRepositoryTest {
    @Autowired
    ProductRepository productRepository;

    @Test
    void testInsert() {
        for (int i = 0; i < 10; i++) {
            ProductEntity product = ProductEntity.builder()
                    .pName("상품" + i)
                    .price(100 * i)
                    .pDesc("상품 설명 " + i)
                    .build();

            // 2개의 이미지 추가
            product.addImageString(UUID.randomUUID() + "_" + "IMAGE1.jpg");
            product.addImageString(UUID.randomUUID() + "_" + "IMAGE2.jpg");

            productRepository.save(product);
        }
        // 삽입된 데이터 확인
        List<ProductEntity> products = productRepository.findAll();
        products.forEach(product -> log.debug("상품: {}", product));
    }

    @Test
    @Transactional
    void testRead() {
        Long pno = 1L;
        Optional<ProductEntity> result = productRepository.findById(pno);
        ProductEntity product = result.orElseThrow();
        log.debug("상품 엔티티 {}", product);
        log.debug("상품 이미지 {}", product.getImageList());
    }
}