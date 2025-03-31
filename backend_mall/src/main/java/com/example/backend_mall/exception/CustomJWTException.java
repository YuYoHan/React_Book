package com.example.backend_mall.exception;

public class CustomJWTException extends RuntimeException{
    public CustomJWTException(String msg) {
        super(msg);
    }
}
