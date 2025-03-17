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

    // 새롭게 서버에 보내지는 실제 파일 데이터
    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>();

    // 업로드가 완료된 파일의 이름만 문자열로 가지고 있는 리스트
    // DB에 파일 이름들을 처리하는 용도로 사용
    @Builder.Default
    private List<String> uploadFileNames = new ArrayList<>();
}
