import { useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks.ts';


const AuthLayout = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);
    return (
        <div style={{ minHeight: '100vh' }} className="h-full bg-gray-50 p-3">
            <div className="flex w-full justify-between">
                <div className="border px-8 py-2">
                    Logo
                </div>
            </div>
            <div
                className="container mx-auto mt-3">
                <Outlet />
            </div>
        </div>
    );
};
export default AuthLayout;
