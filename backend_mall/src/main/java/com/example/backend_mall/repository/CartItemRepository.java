package com.example.backend_mall.repository;

import com.example.backend_mall.dto.CartItemListDTO;
import com.example.backend_mall.entity.CartItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItemEntity, Long> {
    // 특정한 사용자의 이메일을 통해 해당 사용자의 모든 장바구니 아이템을 조회하는 기능
    // - 로그인했을 때 사용자가 담은 모든 장바구니 아이템 조회시 사용
    @Query("select " +
            "new com.example.backend_mall.dto.CartItemListDTO(ci.cino, ci.qty, p.pno, p.pName, p.price, pi.fileName)" +
            "from " +
            "CartItemEntity ci inner join CartEntity mc on ci.cart = mc " +
            "left join ProductEntity p on ci.product = p " +
            "left join p.imageList pi " +
            "where " +
            "mc.owner.email = :email and pi.ord = 0 " +
            "order by ci.cino desc ")
    List<CartItemListDTO> getItemsOfDTOByEmail(@Param("email") String email);

    // 사용자의 이메일과 상품번호로 해당 장바구니 아이템을 알아내는 기능
    // - 새로운 상품을 장바구니에 담고자할 때 기존 장바구니 아이템인지 확인하기 위해 필요
    @Query("select ci from " +
            "CartItemEntity ci inner join CartEntity  c on ci.cart = c " +
            "where c.owner.email = :email and ci.product.pno = :pno")
    CartItemEntity getItemOfPno(@Param("email") String email, @Param("pno") Long pno);

    // 장바구니 아이템이 속한 장바구니의 번호를 알아내는 기능
    // - 해당 아이템을 삭제한 후 해당 아이템이 속해 있는 장바구니의 모든 아이템을 알아내기 위해 필요
    @Query("select c.cno from " +
            "CartEntity c inner join CartItemEntity ci on ci.cart = c " +
            "where ci.cino = :cino")
    Long getCartFromItem(@Param("cino") Long cino);

    // 특정한 장바구니의 번호만으로 해당 장바구니의 모든 장바구니 아이템을 조회하는 기능
    // - 특정한 장바구니 아이템을 삭제한 후에 해당 장바구니 아이템이 속해 있는 장바구니의 모든 장바구니 아이템을 조회할 때 필요
    @Query("select new com.example.backend_mall.dto.CartItemListDTO(ci.cino, ci.qty, p.pno, p.pName, p.price, pi.fileName) " +
            "from CartItemEntity ci inner join CartEntity mc on ci.cart = mc " +
            "left join ProductEntity p on ci.product = p " +
            "left join p.imageList pi " +
            "where mc.cno = : cno and pi.ord = 0 order by ci.cino desc ")
    List<CartItemListDTO> getItemsOfCartDTOByCart(@Param("cno") Long cno);
}
