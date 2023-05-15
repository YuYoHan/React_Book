package com.example.jwt.controller.jwt1;

import com.example.jwt.DTO.jwt1.TokenDataResponse;
import com.example.jwt.DTO.jwt1.TokenResponse;
import com.example.jwt.DTO.jwt1.TokenResponseNoData;
import com.example.jwt.JwtProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class jwtController {

    private final JwtProvider jwtProvider;

    // 토큰 생성 컨트롤러
    @GetMapping("/tokenCreate/{userId}")
    public TokenResponse createToken(@PathVariable("userId") String userId) throws Exception {
        String token = jwtProvider.createToken(userId); // 토큰 생성
        Claims claims = jwtProvider.parseJwtToken("Bearer" + token); // 토큰 검증

        TokenDataResponse tokenDataResponse = new TokenDataResponse(
                token,
                claims.getSubject(),
                claims.getIssuedAt().toString(),
                claims.getExpiration().toString());

        TokenResponse tokenResponse = new TokenResponse("200", "OK", tokenDataResponse);
        return tokenResponse;
    }

    // 토큰 인증 컨트롤러
    @GetMapping("/checkToken")
    public TokenResponseNoData checkToken(@RequestHeader("Authorization") String token) throws Exception {
        Claims claims = jwtProvider.parseJwtToken(token);

        TokenResponseNoData tokenResponseNoData = new TokenResponseNoData("200", "success");
        return tokenResponseNoData;
    }
}
