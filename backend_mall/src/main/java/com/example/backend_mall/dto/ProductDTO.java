package com.example.backend_mall.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@ToString
public class ProductDTO {
    private Long pno;
    private String pName;
    private int price;
    private String pDesc;

    // 삭제 여부 : 실제 삭제하는 것이 아니라 삭제 표시처럼 해줌
    private boolean delFlag;

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>();
    @Builder.Default
    private List<String> uploadFileNames = new ArrayList<>();
}
