package com.example.backend_mall.repository;

import com.example.backend_mall.entity.MemberEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    @EntityGraph(attributePaths = {"memberRoles"})
    @Query("select m from MemberEntity m where m.email = :email")
    MemberEntity getWithRoles(@Param("email") String email);

}
