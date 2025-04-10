package com.example.backend_mall.repository;

import com.example.backend_mall.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CartRepository extends JpaRepository<CartEntity, Long> {
    @Query("select cart from CartEntity cart where cart.owner.email = :email")
    Optional<CartEntity> getCartOfMember(@Param("email")String email);
}
