package com.example.backend_mall.controller.refresh;

import com.example.backend_mall.config.jwt.JWTUtil;
import com.example.backend_mall.exception.CustomJWTException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class APIRefreshController {

    @RequestMapping("/api/member/refresh")
    public Map<String, Object> refresh(@RequestHeader("Authorization") String authHeader, String refreshToken) {
        if(refreshToken == null) {
            throw new CustomJWTException("NULL_REFRESH");
        }
        if(authHeader == null || authHeader.length() < 7) {
            throw new CustomJWTException("Invalid_string");
        }

        String accessToken = authHeader.substring(7);

        // Access 토큰이 만료되지 않았다면
        if(!checkExpiredToken(accessToken)) {
            return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
        }

        // Refresh 토큰 검증
        Map<String, Object> claims = JWTUtil.validateToken(refreshToken);
        String newAccessToken = JWTUtil.generateToken(claims, 10);
        String newRefreshToken = checkTime((Integer) claims.get("exp")) == true ? JWTUtil.generateToken(claims, 60 * 24) : refreshToken;

        return Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken);
    }

    private boolean checkExpiredToken(String token) {
        try {
            JWTUtil.validateToken(token);
        } catch (CustomJWTException e) {
            if(e.getMessage().equals("Expired")) {
                return true;
            }
        }
        return false;
    }

    // 시간이 1시간 미만으로 남았다면
    private boolean checkTime(Integer exp) {
        // JWT exp를 날짜로 변환
        Date expDate = new Date((long) exp * 1000);
        // 현재 시간과의 차이를 계산 - 밀리세컨즈
        long gap = expDate.getTime() - System.currentTimeMillis();
        // 분단위 계산
        long leftMin = gap / (1000 * 60);
        // 1시간도 안남았는지 계산
        return leftMin < 60;
    }
}
