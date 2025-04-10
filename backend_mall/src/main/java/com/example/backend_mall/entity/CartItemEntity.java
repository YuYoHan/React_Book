package com.example.backend_mall.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cino;

    @ManyToOne
    @JoinColumn(name = "product_pno")
    private ProductEntity product;
    @ManyToOne
    @JoinColumn(name = "cart_cno")
    private CartEntity cart;
    private int qty;

    public void changeQty(int qty) {
        this.qty = qty;
    }
}
