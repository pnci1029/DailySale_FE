import style from "../../assets/scss/sub/login.module.scss";

export function SignInSearchField() {
    return (
        <div className={style.loginOptions}>
            <label className={style.memorizeWrapper}>
                <input type="checkbox" /> 아이디 비밀번호 기억하기
            </label>
            <div className={style.findInfoWrapper}>
                Find<span className={style.findText}>ID</span>|
                <span className={style.findText}>Password</span>

            </div>
        </div>
    )
}