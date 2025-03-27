import { Navigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import { JsonResponseDTO } from "@/types/common";
import { UserDTO } from "@/types/auth";
import { getCurrentUserAsync } from "../slice/AuthSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

enum AuthType {
    ADMIN = "ADMIN",
    NOT_ADMIN = "NOT_ADMIN",
    NOT_LOGIN = "NOT_LOGIN",
}

// @ts-ignore
const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const [isAdmin, setIsAdmin] = useState<AuthType>(AuthType.NOT_LOGIN);
    const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 추가

    const getCurrentUserInfo = useCallback(async () => {
        try {
            const result: JsonResponseDTO<UserDTO> = await dispatch(getCurrentUserAsync()).unwrap();
            setIsAdmin(result.data.role === 'admin' ? AuthType.ADMIN : AuthType.NOT_ADMIN);
        } catch (err: any) {
            console.log(err.message || 'Failed to sign up');
            setIsAdmin(AuthType.NOT_LOGIN);
        } finally {
            setIsLoading(false);  // 데이터 로딩 완료
        }
    }, [dispatch]);

    useEffect(() => {
        getCurrentUserInfo();
    }, [getCurrentUserInfo]);

    if (isLoading) {
        return <div>Loading...</div>;  // 또는 로딩 스피너 컴포넌트
    }

    switch (isAdmin) {
        case AuthType.ADMIN:
            return children;
        case AuthType.NOT_ADMIN:
            return <Navigate to="/" replace />;
        case AuthType.NOT_LOGIN:
            return <Navigate to="/signin" state={{ from: location }} replace />;
        default:
            return <Navigate to="/signin" state={{ from: location }} replace />;
    }
};

export default ProtectedRoute;