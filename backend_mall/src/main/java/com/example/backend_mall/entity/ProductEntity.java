package com.example.backend_mall.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_product")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pno;

    private String pName;
    private int price;
    private String pDesc;
    private boolean delFlag;

    // 값 타입 객체를 컬렉션으로 처리할 때는 @ElementCollection을 활용합니다.
    @ElementCollection
    @Builder.Default
    private List<ProductImageEntity> imageList = new ArrayList<>();

    public void changePrice(int price) {
        this.price = price;
    }

    public void changeDesc(String desc) {
        this.pDesc = desc;
    }

    public void changeName(String name) {
        this.pName = name;
    }

    public void addImage(ProductImageEntity image) {
        image.setOrd(this.imageList.size());
        imageList.add(image);
    }

    public void addImageString(String fileName) {
        ProductImageEntity productImage = ProductImageEntity.builder()
                .fileName(fileName)
                .build();

        addImage(productImage);
    }

    public void clearList() {
        this.imageList.clear();
    }

    public void changeDel(boolean delFlag) {
        this.delFlag = delFlag;
    }
}
