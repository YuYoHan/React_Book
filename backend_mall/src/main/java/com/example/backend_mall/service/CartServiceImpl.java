package com.example.backend_mall.service;

import com.example.backend_mall.dto.CartItemDTO;
import com.example.backend_mall.dto.CartItemListDTO;
import com.example.backend_mall.entity.CartEntity;
import com.example.backend_mall.entity.CartItemEntity;
import com.example.backend_mall.entity.MemberEntity;
import com.example.backend_mall.entity.ProductEntity;
import com.example.backend_mall.repository.CartItemRepository;
import com.example.backend_mall.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartServiceImpl implements CartService{
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO) {
        String email = cartItemDTO.getEmail();
        Long pno = cartItemDTO.getPno();
        int qty = cartItemDTO.getQty();
        Long cino = cartItemDTO.getCino();

        // 장바구니 아이템 번호가 있어서 수량만 변경하는 경우
        if(cino != null) {
            CartItemEntity cartItem = cartItemRepository.findById(cino).orElseThrow();
            cartItem.changeQty(qty);
            cartItemRepository.save(cartItem);
            return getCartItems(email);
        }
        // 장바구니 아이템 번호 cino가 없는 경우
        // 사용자 카트
        CartEntity cart = getCart(email);
        CartItemEntity cartItem = null;

        // 이미 동일한 상품이 담긴적이 있을 수 있으므로
        cartItem = cartItemRepository.getItemOfPno(email, pno);

        if(cartItem == null) {
            ProductEntity product = ProductEntity.builder().pno(pno).build();
            cartItem = CartItemEntity.builder().product(product).cart(cart).build();
        } else {
            cartItem.changeQty(qty);
        }
        // 상품 아이템 저장
        cartItemRepository.save(cartItem);
        return getCartItems(email);
    }

    // 사용자 장바구니가 없다면 새로운 장바구니를 생성하고 반환
    private CartEntity getCart(String email) {
        CartEntity cart = null;
        Optional<CartEntity> result = cartRepository.getCartOfMember(email);

        if(result.isEmpty()) {
            MemberEntity member = MemberEntity.builder().email(email).build();
            CartEntity tempCart = CartEntity.builder().owner(member).build();
            cart = cartRepository.save(tempCart);
        } else {
            cart = result.get();
        }
        return cart;
    }

    @Override
    public List<CartItemListDTO> getCartItems(String email) {
        return cartItemRepository.getItemsOfDTOByEmail(email);
    }

    @Override
    public List<CartItemListDTO> remove(Long cino) {
        Long cno = cartItemRepository.getCartFromItem(cino);
        cartItemRepository.deleteById(cno);
        return cartItemRepository.getItemsOfCartDTOByCart(cno);
    }
}
