import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoAPI";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const authCode = searchParams.get("code");
    const dispatch = useDispatch();
    const { moveToPath } = useCustomLogin();

    useEffect(() => {
        getAccessToken(authCode).then(
            (accessToken) => {
                getMemberWithAccessToken(accessToken).then((memberInfo) => {
                    console.log(memberInfo);
                    dispatch(login(memberInfo));

                    // 소셜회원이 아니라면
                    if (memberInfo && !memberInfo.social) {
                        moveToPath("/");
                    } else {
                        moveToPath("/member/modify");
                    }
                });
            },
            [authCode]
        );
    });

    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>{authCode}</div>
        </div>
    );
};

export default KakaoRedirectPage;
