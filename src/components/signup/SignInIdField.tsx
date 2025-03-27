import style from "../../assets/scss/sub/login.module.scss";
import {ValidateStatus} from "../../types/signup";
import {useEffect} from "react";

interface Args {
    email: string;
    setEmail: (_: string) => void
    emailValidate: ValidateStatus;
    setEmailValidate: (_: ValidateStatus) => void;
}

export function SignInIdField({email, setEmail, emailValidate, setEmailValidate}: Args) {


    useEffect(() => {
        if (emailValidate === ValidateStatus.UNFILLED) {
            setEmailValidate(email.length === 0 ? ValidateStatus.UNFILLED : ValidateStatus.NONE);
        }
        // eslint-disable-next-line
    }, [email]);
    return (
        <div className={style.loginForm}>
            <input
                type="email" placeholder="koreer@gmail.com"
                className={style.loginInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>

            {/*  에러 메세지  */}
            {emailValidate === ValidateStatus.UNFILLED && (
                <span style={{marginTop: '-25px', fontSize: '16px', color: 'red'}}>아이디를 입력해주세요.</span>
            )}

            <span className={style.loginAssistText}>ID</span>
        </div>
    );
}