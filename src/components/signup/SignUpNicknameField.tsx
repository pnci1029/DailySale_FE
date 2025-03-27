import style from "../../assets/scss/sub/signup.module.scss";
import {handleSaveInput} from "../../util/etcUtil";
import {ValidateStatus} from "../../types/signup";
import {useEffect} from "react";

interface Args{
    nickName: string;
    setNickName: (_: string) => void
    nickNameValidate: ValidateStatus;
    setNickNameValidate: (_: ValidateStatus) => void;
}
export function SignUpNicknameField({nickName, setNickName,
                                        nickNameValidate, setNickNameValidate}:Args) {

    useEffect(() => {
        setNickNameValidate(ValidateStatus.NONE)
        // eslint-disable-next-line
    }, [nickName]);
    return (
        <>
            <div className={style.content}>
                <span className={style.contentText}>
                    닉네임
                </span>
                <input
                    placeholder={"koreer123"}
                    className={style.contentInput}
                    onChange={(e) => handleSaveInput(e, setNickName)}
                />
            {nickNameValidate === ValidateStatus.BELOW_REQUIRED_LENGTH && (
                <span className={style.duplicateMessage}>
                    닉네임을 작성해주세요!
                </span>
            )}
            </div>
        </>
    )
}