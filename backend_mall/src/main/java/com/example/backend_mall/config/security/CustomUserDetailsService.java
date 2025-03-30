package com.example.backend_mall.config.security;

// 스프링 시큐리티는 사용자의 인증처리를 위해서 UserDetailsService라는 인터페이스의 구현체를 활용합니다.

import com.example.backend_mall.dto.MemberDTO;
import com.example.backend_mall.entity.MemberEntity;
import com.example.backend_mall.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MemberEntity member = memberRepository.getWithRoles(username);

        if(member == null) {
            throw new UsernameNotFoundException(("Not Found"));
        }

        MemberDTO memberDTO = MemberDTO.builder()
                .email(member.getEmail())
                .pw(member.getPw())
                .nickName(member.getNickName())
                .social(member.isSocial())
                .roleNames(member.getMemberRoles()
                        .stream()
                        .map(memberRole -> memberRole.name()).collect(Collectors.toList()))
                .build();

        log.debug("member {}", memberDTO);
        return memberDTO;
    }
}
