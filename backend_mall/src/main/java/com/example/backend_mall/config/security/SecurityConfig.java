package com.example.backend_mall.config.security;

import com.example.backend_mall.config.security.handler.APILoginFailHandler;
import com.example.backend_mall.config.security.handler.APILoginSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()));

        http
                .sessionManagement(sessionConfig -> sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http
                .csrf(csrf -> csrf.disable());

        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/login").permitAll()
                        .requestMatchers("/admin").hasRole("ADMIN")
                        .requestMatchers("/my/**").hasAnyRole("ADMIN","USER")
                        .anyRequest().authenticated());

        // 이렇게 설정을 하면 스프링 시큐리티는 POST 방식으로 username과 password라는 파라미터를 통해서 로그인을 처리
        http
                .formLogin(config -> {
                    config.loginPage("/api/member/login");
                    config.successHandler(new APILoginSuccessHandler());
                    config.failureHandler(new APILoginFailHandler());
                });


        return http.build();
    }

    // CORS에 대한 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Spring Boot 2.4+부터는 setAllowedOrigins 대신 setAllowedOriginPatterns를 사용하는 것이 권장
        configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:*")); // 허용할 Origin
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 허용할 메서드
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type")); // 허용할 헤더
        configuration.setAllowCredentials(true); // 인증 정보 허용
        configuration.setExposedHeaders(Arrays.asList("Cache-Control", "Content-Type", "X-Accel-Buffering","Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 경로에 대해 CORS 설정
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
