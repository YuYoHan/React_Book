package com.example.backend_mall.service;

import com.example.backend_mall.dto.PageRequestDTO;
import com.example.backend_mall.dto.PageResponseDTO;
import com.example.backend_mall.dto.ProductDTO;
import com.example.backend_mall.entity.ProductEntity;
import com.example.backend_mall.entity.ProductImageEntity;
import com.example.backend_mall.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;

    @Override
    public PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO) {
        PageRequest page = PageRequest.of(
                // 페이지 시작이 0부터 시작하므로
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("tno").descending()
        );

        Page<Object[]> result = productRepository.selectList(page);
        List<ProductDTO> dtoList = result.get().map(arr -> {
            ProductEntity product = (ProductEntity) arr[0];
            ProductImageEntity productImage = (ProductImageEntity) arr[1];

            ProductDTO productDTO = ProductDTO.builder()
                    .pno(product.getPno())
                    .pName(product.getPName())
                    .pDesc(product.getPDesc())
                    .price(product.getPrice())
                    .build();

            String imageStr = productImage.getFileName();
            productDTO.getUploadFileNames().add(imageStr);
            return productDTO;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<ProductDTO>withAll()
                .dtoList(dtoList)
                .totalCount((int) totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }
}
