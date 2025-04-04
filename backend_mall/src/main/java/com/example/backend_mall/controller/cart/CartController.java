package com.example.backend_mall.controller.cart;

import com.example.backend_mall.dto.CartItemDTO;
import com.example.backend_mall.dto.CartItemListDTO;
import com.example.backend_mall.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;

    // itemDTO 객체의 email 값이 현재 로그인한 사용자(authentication.name)의 이메일과
    // 일치할 때만 메서드를 실행할 수 있게 합니다.
    @PreAuthorize("#itemDTO.email == authentication.name")
    @PostMapping("/change")
    public List<CartItemListDTO> changeCart(@RequestBody CartItemDTO itemDTO) {
        if(itemDTO.getQty() <= 0) {
            return cartService.remove(itemDTO.getCino());
        }
        return cartService.addOrModify(itemDTO);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/items")
    public List<CartItemListDTO> getCartItems(Principal principal) {
        String email = principal.getName();
        return cartService.getCartItems(email);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @DeleteMapping("/{cino}")
    public List<CartItemListDTO> removeFromCart(@PathVariable("cino") Long cino) {
        return cartService.remove(cino);
    }
}
