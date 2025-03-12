package com.example.backend_mall.config.file;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@Slf4j
@RequiredArgsConstructor
public class CustomFileUtil {
    @Value("${org.zerock.upload.path}")
    private String uploadPath;

    // Spring Bean이 생성된 후 자동으로 실행되는 초기화 메서드입니다.
    @PostConstruct
    public void init() {
        File tempFolder = new File(uploadPath);

        // tempFolder.exists()는 해당 경로에 폴더나 파일이 존재하는지 확인
        // 존재하지 않으면(false), 아래 mkdir()을 실행하여 폴더를 생성
        if(!tempFolder.exists()) {
            tempFolder.mkdir();
        }

        // 임시 폴더의 절대 경로를 가져옴
        uploadPath = tempFolder.getAbsolutePath();

        log.debug(uploadPath);
    }

    public List<String> saveFiles(List<MultipartFile> files) throws  RuntimeException {
        if(files == null || files.isEmpty()) {
            return List.of();
        }

        List<String> uploadNames = new ArrayList<>();

        for (MultipartFile multipartFile : files) {
            // 중복된 이름의 파일이 저장되는 것을 막기위해서
            String saveName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();
            log.debug(saveName);

            Path savePath = Paths.get(uploadPath, saveName);

            try {
                Files.copy(multipartFile.getInputStream(), savePath);
                uploadNames.add(saveName);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }
        }
        return uploadNames;
    }
}
