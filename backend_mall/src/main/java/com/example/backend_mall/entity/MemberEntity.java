package com.example.backend_mall.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberEntity {
    @Id @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String email;
    private String pw;
    private String nickName;
    private boolean social;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<MemberRole> memberRoles = new ArrayList<>();

    public void addRole(MemberRole memberRole) {
        memberRoles.add(memberRole);
    }

    public void clearRole() {
        memberRoles.clear();
    }

    public void changeNickName(String nickName) {
        this.nickName = nickName;
    }

    public void changePw(String pw) {
        this.pw = pw;
    }

    public void changeSocial(boolean social) {
        this.social = social;
    }
}
