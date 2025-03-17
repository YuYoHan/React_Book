package com.example.backend_mall.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

// 값 타입 객체 : 값 타입 객체는 PK가 없는 데이터
@Embeddable
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductImageEntity {
    private String fileName;
    private int ord;

    public void setOrd(int ord) {
        this.ord = ord;
    }
}
