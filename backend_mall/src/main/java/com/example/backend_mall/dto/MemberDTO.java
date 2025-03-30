package com.example.backend_mall.dto;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.*;
import java.util.stream.Collectors;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDTO extends User {
    private String email;
    private String pw;
    private String nickName;
    private boolean social;
    @Builder.Default
    private List<String> roleNames = new ArrayList<>();

    public MemberDTO(String email,
                     String pw,
                     String nickName,
                     boolean social, List<String> roleNames) {
        super(
                email,
                pw,
                roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_"+str))
                        .collect(Collectors.toList()));
                this.email = email;
                this.pw = pw;
                this.nickName = nickName;
                this.social = social;
                this.roleNames = roleNames;
    }

    // JWT 문자열 생성 시에 사용하기 위함
    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("email", email);
        dataMap.put("pw", pw);
        dataMap.put("nickName", nickName);
        dataMap.put("social", social);
        dataMap.put("roleNames", roleNames);
        return dataMap;
    }
}
