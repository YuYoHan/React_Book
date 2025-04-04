package com.example.backend_mall.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = "owner")
@Table(
        name = "tbl_cart",
        indexes = {@Index(name = "idx_cart_email", columnList = "member_owner")}
)
public class CartEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cno;

    @OneToOne
    @JoinColumn(name = "id")
    private MemberEntity owner;
}
