package com.example.backend_mall.dto;

import lombok.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PageResponseDTO<E> {
    private List<?> dtoList;
    private PageRequestDTO pageRequestDTO;
    private List<Integer> pageNumList ;
    private boolean prev, next;
    private int totalCount, prevPage, nextPage, totalPage, current;

    @Builder(builderMethodName = "withAll")
    public PageResponseDTO(List<?> dtoList, PageRequestDTO pageRequestDTO, int totalCount) {
        this.dtoList = dtoList;
        this.pageRequestDTO = pageRequestDTO;
        this.totalCount = (int) totalCount;

        // 끝 페이지 계산
        int end = (int) (Math.ceil(pageRequestDTO.getPage() / 10.0)) * 10;
        // 시작 페이지 계산
        // 시작 페이지 계산할 때 9를 빼는 것은 고정이다.
        int start = end - 9;
        int last = (int) (Math.ceil((totalCount / (double) pageRequestDTO.getSize())));

        end = Math.min(end, last);
        this.prev = start > 1;
        this.next = totalCount > end * pageRequestDTO.getSize();
        this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

        if(prev) this.prevPage = start -1;
        if(next) this.nextPage = end + 1;
        this.totalPage = this.pageNumList.size();
        this.current = pageRequestDTO.getPage();
    }
}
