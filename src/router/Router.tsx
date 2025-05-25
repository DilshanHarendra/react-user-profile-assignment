import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import AuthLayout from '../layouts/auth/AuthLayout';
import DefaultLayout from '../layouts/DefaultLayout';


const Login = lazy(() => import('../pages/auth/login/Login.Auth.tsx'));
const Register = lazy(() => import('../pages/auth/register/Register.Auth.tsx'));
const Home = lazy(() => import('../pages/home/Home.home.tsx'));
const Profile = lazy(() => import('../pages/profile/Profile.profile.tsx'));
const PageNotFound = lazy(() => import('../pages/errors/PageNotFound.errors.tsx'));

function Router() {

    return useRoutes([
        {
            path: '/auth/',
            element: <AuthLayout />,
            children: [
                {
                    path: 'login',
                    element: <Login />,
                },
                {
                    path: 'register',
                    element: <Register />,
                },
            ],
        },
        {
            path: '',
            element: <DefaultLayout />,
            children: [
                {
                    path: '/',
                    element: <Home/>,
                },
                {
                    path: '/profile',
                    element: <Profile/>,
                },
                {
                    path: '/profile-edit',
                    element: <Profile/>,
                },

            ],
        },
        {
            path: '*',
            element: <PageNotFound />,
        },
    ]);
}
export default Router;
