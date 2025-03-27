import style from "../../assets/scss/sub/login.module.scss";
import {ValidateStatus} from "../../types/signup";
import {useEffect} from "react";

interface Args {
    password: string;
    setPassword: (_: string) => void
    passwordValidate: ValidateStatus;
    setPasswordValidate: (_: ValidateStatus) => void;
}

export function SignInPasswordField({password, setPassword, passwordValidate, setPasswordValidate}: Args) {

    useEffect(() => {
        if (passwordValidate === ValidateStatus.UNFILLED) {
            setPasswordValidate(password.length === 0 ? ValidateStatus.UNFILLED : ValidateStatus.NONE);
        }

        // eslint-disable-next-line
    }, [password]);
    return (
        <div className={style.loginForm}>
            <input type="password" placeholder="1234" className={style.loginInput}
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}/>

            {/*  에러 메세지  */}
            {passwordValidate === ValidateStatus.UNFILLED && (
                <span style={{marginTop: '-25px', fontSize: '16px', color: 'red'}}>비밀번호를 입력해주세요.</span>
            )}

            <span className={style.loginAssistText}>Password</span>
        </div>
    );
}