package com.example.backend_mall.config.security.handler;

/*
*   로그인에 성공한 후에는 AuthenticationSuccessHandler라는 것을 통해서 후처리
*   작업이 가능합니다. API 서버의 경우 로그인 후에는 JSON 문자열을 생성해서 전달하도록 구성
* */

import com.example.backend_mall.dto.MemberDTO;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@Slf4j
public class APILoginSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        log.debug("authentication {}", authentication);
        MemberDTO memberDTO = (MemberDTO) authentication.getPrincipal();
        Map<String, Object> claims = memberDTO.getClaims();
        claims.put("accessToken", "");
        claims.put("refreshToken", "");
        Gson gson = new Gson();
        String jsonStr = gson.toJson(claims);
        response.setContentType("application/json; charset=URF-8");
        PrintWriter printWriter = response.getWriter();
        printWriter.println(jsonStr);
        printWriter.close();
    }
}
