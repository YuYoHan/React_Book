package com.example.backend_mall.service;

import com.example.backend_mall.dto.PageRequestDTO;
import com.example.backend_mall.dto.PageResponseDTO;
import com.example.backend_mall.dto.ProductDTO;

public interface ProductService {
    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);
}
