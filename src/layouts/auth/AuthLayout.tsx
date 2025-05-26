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
              <div className="mx-auto  w-full sm:w-[480px] sm:p-8">
                <h1 className="text-2xl font-medium text-center">Welcome to <span className="font-bold">{import.meta.env.VITE_APP_NAME}</span></h1>
                <span className="border-2 border-gray-500 w-2/4 mx-auto mt-2 block"></span>
                <Outlet />
              </div>
            </div>
        </div>
    );
};
export default AuthLayout;
