package com.example.backend_mall.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemListDTO {
    private Long cino;
    private int qty;
    private Long pno;
    private String pName;
    private int price;
    private String imageFile;

    // 직접 생성자를 생성하는 이유는 JPQL을 이용해서 직접 DTO 객체를 생성하는
    // Projection이라는 방식을 사용하기 위해서
    public CartItemListDTO(Long cino,
                           int qty,
                           Long pno,
                           String pName,
                           int price,
                           String imageFile) {
        this.cino = cino;
        this.qty = qty;
        this.pno = pno;
        this.pName = pName;
        this.price = price;
        this.imageFile = imageFile;
    }
}
