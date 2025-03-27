import style from "../../assets/scss/sub/signup.module.scss";
import {handleSaveInput} from "../../util/etcUtil";
import {ValidateStatus} from "../../types/signup";
import {useEffect} from "react";

interface Args{
    password: string;
    setPassword: (_: string) => void
    passwordValidate: ValidateStatus;
    setPasswordValidate: (_: ValidateStatus) => void;
}
export function SignUpPasswordField({password,setPassword, passwordValidate, setPasswordValidate}:Args) {

    useEffect(() => {
        setPasswordValidate(ValidateStatus.NONE)
        // eslint-disable-next-line
    }, [password]);
    return(
        <>
            <div className={style.content}>
                <span className={style.contentText}>
                    비밀번호
                </span>
                <input
                    type={"password"}
                    placeholder={"최소 4자 이상으로 작성해주세요."}
                    className={style.contentInput}
                    onChange={(e) =>handleSaveInput(e, setPassword)}
                />
                {passwordValidate === ValidateStatus.BELOW_REQUIRED_LENGTH && (
                    <span className={style.duplicateMessage}>
                        비밀번호는 4~15자리로 작성해주세요.
                    </span>
                )}

            </div>
        </>
    )
}