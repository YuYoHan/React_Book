import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getAccessToken } from "../../api/kakaoAPI";

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const authCode = searchParams.get("code");

    useEffect(() => {
        getAccessToken(authCode).then((data) => {}, [authCode]);
    });

    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>{authCode}</div>
        </div>
    );
};

export default KakaoRedirectPage;
