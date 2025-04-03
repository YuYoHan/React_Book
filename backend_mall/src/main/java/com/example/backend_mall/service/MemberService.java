package com.example.backend_mall.service;

import com.example.backend_mall.dto.MemberDTO;
import com.example.backend_mall.entity.MemberEntity;

import java.util.stream.Collectors;

public interface MemberService {
    MemberDTO getKakaoMember(String accessToken);
    default MemberDTO entityToDTO(MemberEntity member) {
        MemberDTO dto = MemberDTO.builder()
                .email(member.getEmail())
                .pw(member.getPw())
                .nickName(member.getNickName())
                .social(member.isSocial())
                .roleNames(member.getMemberRoles().stream()
                        .map(memberRole -> memberRole.name()).collect(Collectors.toList())).build();
        return dto;
    }
}
