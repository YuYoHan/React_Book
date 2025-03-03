import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
    app.use(
        "/api/v1", // /api/v1 경로로 오는 요청을
        createProxyMiddleware({
            target: "http://localhost:8080", // localhost:8080으로 보내도록 설정
            changeOrigin: true, // origin 헤더를 target으로 맞춰줍니다.
        })
    );
}
