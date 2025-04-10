import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { modifyMember } from "../../api/memberAPI";
import ResultModal from "../common/ResultModal";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
    email: "",
    pw: "",
    nickName: "",
};

const ModifyComponent = () => {
    const [member, setMember] = useState(initState);
    const loginInfo = useSelector((state) => state.loginSlice);
    const { moveToLogin } = useCustomLogin();
    const [result, setResult] = useState();

    useEffect(() => {
        setMember({ ...loginInfo, pw: "ABCD" });
    }, [loginInfo]);

    const handleChange = (e) => {
        member[e.target.name] = e.target.value;
        setMember({ ...member });
    };

    const handleClickModify = () => {
        modifyMember(member).then((result) => {
            setResult("Moodified");
        });
    };

    const closeModal = () => {
        setResult(null);
        moveToLogin();
    };

    return (
        <div className="mt-6">
            {result ? (
                <ResultModal
                    title={"회원정보"}
                    content={"정보수정완료"}
                    callbackFn={closeModal}
                ></ResultModal>
            ) : (
                <></>
            )}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Email</div>
                    <input
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="email"
                        type={"text"}
                        value={member.email}
                        readOnly
                    ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">
                        Password
                    </div>
                    <input
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="pw"
                        type={"password"}
                        value={member.pw}
                        onChange={handleChange}
                    ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">
                        NickName
                    </div>
                    <input
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="nickName"
                        type={"text"}
                        value={member.nickName}
                        onChange={handleChange}
                    ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap justify-end">
                    <button
                        type="button"
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                        onClick={handleClickModify}
                    >
                        Modify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModifyComponent;
