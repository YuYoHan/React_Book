import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/todo`;

// 특정 번호의 Todo를 조회
export const getOne = async (tno) => {
    const res = await axios.get(`${prefix}/${tno}`);
    return res.data;
};

// 페이지 처리를 위해 사용
export const getList = async (pageParam) => {
    const { page, size } = pageParam;
    const res = await axios.get(`${prefix}/list`, {
        params: { page: page, size: size },
    });
    return res.data;
};

// 생성
export const postAdd = async (todoObj) => {
    const res = await axios.post(`${prefix}/`, todoObj);
    return res.data;
};

// 삭제
export const deleteOne = async (tno) => {
    const res = await axios.delete(`${prefix}/${tno}`);
    return res.data;
};

// 수정
export const putOne = async (todo) => {
    const res = await axios.put(`${prefix}/${todo.tno}`, todo);
    return res.data;
};
