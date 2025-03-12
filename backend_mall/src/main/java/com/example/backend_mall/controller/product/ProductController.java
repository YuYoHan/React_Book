package com.example.backend_mall.controller.product;

import com.example.backend_mall.config.file.CustomFileUtil;
import com.example.backend_mall.dto.ProductDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/products")
public class ProductController {
    private final CustomFileUtil fileUtil;

    @PostMapping("/")
    public Map<String, String> register(ProductDTO productDTO) {
        log.debug("register {}", productDTO);

        List<MultipartFile> files = productDTO.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        productDTO.getUploadFileNames().addAll(uploadFileNames);
        return Map.of("result", "SUCCESS");
    }
}
