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
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/products")
public class ProductController {
    private final CustomFileUtil fileUtil;
    private final ProductService productService;

    @PostMapping("/")
    public Map<String, Long> register(ProductDTO productDTO) {
        log.debug("register {}", productDTO);

        List<MultipartFile> files = productDTO.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        productDTO.getUploadFileNames().addAll(uploadFileNames);
        Long pno = productService.register(productDTO);
        return Map.of("result", pno);
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFile(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO) {
        return productService.getList(pageRequestDTO);
    }

    @GetMapping("/{pno}")
    public ProductDTO read(@PathVariable("pno") Long pno) {
        return productService.get(pno);
    }

    @PutMapping("/{pno}")
    public Map<String, String> modify(@PathVariable Long pno, ProductDTO productDTO) {
        ProductDTO oldProductDTO = productService.get(pno);
        // 기존의 파일들 (데이터베이스에 존재하는 파일들 - 수정 과정에서 삭제되었을 수 도 있음)
        List<String> oldFileNames = oldProductDTO.getUploadFileNames();
        // 새로 업로드 해야하는 파일들
        List<MultipartFile> files = productDTO.getFiles();
        // 새로 업로드되어서 만들어진 파일 이름들
        List<String> currentUploadFileNames = fileUtil.saveFiles(files);
        // 화면에서 변화 없이 계속 유지된 파일들
        List<String> uploadFileNames = productDTO.getUploadFileNames();
        // 유지되는 파일들 + 새로 업로드된 파일 이름들이 저장해야하는 파일 목록이 됨
        if(currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
            uploadFileNames.addAll(currentUploadFileNames);
        }
        // 수정 작업
        productService.modify(productDTO);

        if(oldFileNames != null && oldFileNames.size() >0) {
            // 지워야 하는 파일 목록 찾기
            // 예전 파일들 중에서 지워져야하는 파일이름들
            List<String> removeFiles =
                    oldFileNames
                            .stream()
                            .filter(filterName -> !uploadFileNames.contains(filterName))
                    .collect(Collectors.toList());

            // 실제 파일 삭제
            fileUtil.deleteFiles(removeFiles);
        }
        return Map.of("result", "SUCCESS");
    }
}
