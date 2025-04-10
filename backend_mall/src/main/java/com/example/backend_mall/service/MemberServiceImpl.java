package com.example.backend_mall.service;

import com.example.backend_mall.dto.MemberDTO;
import com.example.backend_mall.dto.MemberModifyDTO;
import com.example.backend_mall.entity.MemberEntity;
import com.example.backend_mall.entity.MemberRole;
import com.example.backend_mall.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.LinkedHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;
    private PasswordEncoder passwordEncoder;

    @Override
    public MemberDTO getKakaoMember(String accessToken) {
        String email = getEmailFromKakaoAccessToken(accessToken);
        MemberEntity result = memberRepository.findByEmail(email);

        // 기존 회원
        if(result != null) {
            MemberDTO memberDTO = entityToDTO(result);
            return memberDTO;
        }

        // 회원이 아니면
        // 닉네임은 소셜회원으로
        // 패스워드는 임의로 생성
        MemberEntity socialMember = makeSocialMember(email);
        memberRepository.save(socialMember);
        MemberDTO memberDTO = entityToDTO(socialMember);
        return memberDTO;
    }

    private String getEmailFromKakaoAccessToken(String accessToken) {
        String kakaoUserURL = "https://kapi.kakao.com/v2/user/me";

        if(accessToken == null) {
            throw new RuntimeException("AccessToken is null");
        }

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(kakaoUserURL).build();
        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(
                uriBuilder.toString(),
                HttpMethod.GET,
                entity,
                LinkedHashMap.class
        );

        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();
        LinkedHashMap<String, String> kakaoAccount = bodyMap.get("kakao_account");
        return kakaoAccount.get("email");
    }

    private String makeTempPassword() {
        StringBuffer buffer = new StringBuffer();
        for (int i = 0; i < 10; i++) {
            buffer.append((char) ((int)(Math.random() * 55) + 65));
        }
        return buffer.toString();
    }

    private MemberEntity makeSocialMember(String email) {
        String tempPassword = makeTempPassword();
        String nickName = "소셜회원";

        MemberEntity member = MemberEntity.builder()
                .email(email)
                .pw(passwordEncoder.encode(tempPassword))
                .nickName(nickName)
                .social(true)
                .build();

        member.addRole(MemberRole.USER);
        return  member;
    }

    @Override
    public void modifyMember(MemberModifyDTO memberModifyDTO) {
        MemberEntity result = memberRepository.findByEmail(memberModifyDTO.getEmail());
        result.changePw(passwordEncoder.encode(memberModifyDTO.getPw()));
        result.changeSocial(false);
        result.changeNickName(memberModifyDTO.getNickName());
        memberRepository.save(result);
    }
}
