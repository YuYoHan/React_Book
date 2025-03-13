package com.example.backend_mall.controller.product;

import com.example.backend_mall.config.file.CustomFileUtil;
import com.example.backend_mall.dto.PageRequestDTO;
import com.example.backend_mall.dto.PageResponseDTO;
import com.example.backend_mall.dto.ProductDTO;
import com.example.backend_mall.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/products")
public class ProductController {
    private final CustomFileUtil fileUtil;
    private final ProductService productService;

    @PostMapping("/")
    public Map<String, String> register(ProductDTO productDTO) {
        log.debug("register {}", productDTO);

        List<MultipartFile> files = productDTO.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        productDTO.getUploadFileNames().addAll(uploadFileNames);
        return Map.of("result", "SUCCESS");
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFile(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO) {
        return productService.getList(pageRequestDTO);
    }
}
