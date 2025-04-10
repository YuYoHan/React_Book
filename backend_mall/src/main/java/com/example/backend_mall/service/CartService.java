package com.example.backend_mall.service;

import com.example.backend_mall.dto.CartItemDTO;
import com.example.backend_mall.dto.CartItemListDTO;

import java.util.List;

public interface CartService {
    // 장바구니 아이템 추가 혹은 변경
    List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO);
    // 모든 장바구니 아이템 목록
    List<CartItemListDTO> getCartItems(String email);
    // 아이템 삭제
    List<CartItemListDTO> remove(Long cino);
}
