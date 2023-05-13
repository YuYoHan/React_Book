package com.example.jwt.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenResponseNoData<T> {
    private String code;
    private  String msg;
}
