package com.example.backend_mall.dto;

import lombok.Data;

@Data
public class MemberModifyDTO {
    private String email;
    private String pw;
    private String nickName;
}
