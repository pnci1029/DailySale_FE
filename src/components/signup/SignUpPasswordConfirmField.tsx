import style from "../../assets/scss/sub/signup.module.scss";
import {handleSaveInput} from "../../util/etcUtil";
import {ValidateStatus} from "../../types/signup";
import {useEffect} from "react";
interface Args{
    passwordCheck: string;
    setPasswordCheck: (_: string) => void
    passwordCheckValidate: ValidateStatus;
    setPasswordCheckValidate: (_: ValidateStatus) => void;
}
export function SignUpPasswordConfirmField({passwordCheck, setPasswordCheck,
                                           passwordCheckValidate, setPasswordCheckValidate}:Args) {

    useEffect(() => {
        setPasswordCheckValidate(ValidateStatus.NONE)
        // eslint-disable-next-line
    }, [passwordCheck]);
    return (
        <>
            <div className={style.content}>
                <span className={style.contentText}>
                    비밀번호 확인
                </span>
                <input
                    type={"password"}
                    placeholder={"최소 4자 이상으로 작성해주세요."}
                    className={style.contentInput}
                    onChange={(e) =>handleSaveInput(e, setPasswordCheck)}
                />
                {passwordCheckValidate === ValidateStatus.BELOW_REQUIRED_LENGTH && (
                    <span className={style.duplicateMessage}>
                        비밀번호는 4~15자리로 작성해주세요.
                    </span>
                )}
                {passwordCheckValidate === ValidateStatus.INVALID && (
                    <span className={style.duplicateMessage}>
                        비밀번호는 4~15자리로 작성해주세요.
                    </span>
                )}
            </div>
        </>
    )
}