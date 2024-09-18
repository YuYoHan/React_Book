package com.example.backend_mall.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RootConfig {
    @Bean
    public ModelMapper getMapper() {
        ModelMapper modelMapper = new ModelMapper();
        // getConfiguration()을 통해 ModelMapper의 설정을 변경합니다.
        modelMapper.getConfiguration()
                // 필드 이름이 일치할 경우 직접 매핑을 활성화합니다.
                // 즉, getter와 setter가 아닌 필드 기반으로 매핑을 허용합니다.
                .setFieldMatchingEnabled(true)
                // 필드의 접근 수준을 PRIVATE으로 설정하여, 접근 제어자가 private인 필드도 매핑이 가능하도록 합니다.
                // 이로써 private 필드도 ModelMapper가 직접 접근할 수 있습니다.
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)
                // 매칭 전략을 LOOSE로 설정합니다.
                // 이 전략은 필드나 메소드 이름이 완전히 일치하지 않더라도, 유사한 이름을 가진 필드나 메소드를 찾아서 매핑합니다.
                .setMatchingStrategy(MatchingStrategies.LOOSE);

        return modelMapper;
    }
}
