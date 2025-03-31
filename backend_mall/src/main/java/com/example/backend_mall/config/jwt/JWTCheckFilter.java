package com.example.backend_mall.config.jwt;

import com.example.backend_mall.dto.MemberDTO;
import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

@Slf4j
public class JWTCheckFilter extends OncePerRequestFilter {

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        log.debug("path {}", path);

        // Preflight 요청은 체크하지 않음
        if(request.getMethod().equals("OPTIONS")) {
            return true;
        }

        // /api/member/ 경로의 호출은 체크하지 않음
        if(path.startsWith("/api/member/")) {
            return true;
        }

        // 이미지 조회 경로는 체크하지 않음
        if (path.startsWith("/api/products/view/")) {
            return true;
        }

        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");

        try {
            String accessToken = authorization.substring(7);
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);

            String email = (String) claims.get("email");
            String pw = (String) claims.get("pw");
            String nickName = (String) claims.get("nickName");
            Boolean social = (Boolean) claims.get("social");
            List<String> roleNames = (List<String>) claims.get("roleNames");

            MemberDTO memberDTO = MemberDTO.builder()
                    .email(email)
                    .pw(pw)
                    .nickName(nickName)
                    .social(social)
                    .roleNames(roleNames)
                    .build();

            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(memberDTO, pw, memberDTO.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(token);

            filterChain.doFilter(request, response);    // 통과
        } catch (Exception e) {
            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();
        }

    }
}
