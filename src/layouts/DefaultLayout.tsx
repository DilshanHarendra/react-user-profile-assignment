import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks.ts';
import { SidebarProvider } from '@/components/ui/sidebar';
import  SidebarNavigation from '@/layouts/default/SidebarNavigation.tsx';
import { Button } from '@/components/ui/button.tsx';



const DefaultLayout = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);



    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth/login');
        }
    }, [isAuthenticated]);



    return (
        <>
        <SidebarProvider setIsMobile={true} >
            <SidebarNavigation isMenuOpen={isMenuOpen}   />
            <div className="w-full p-5">
                    <div className="flex  justify-between container mx-auto">
                        <div className="border px-8 py-2">
                            Logo
                        </div>
                       <Button onClick={()=>setMenuOpen(!isMenuOpen)}  variant="secondary">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                           </svg>
                       </Button>
                    </div>
                    <main>
                        <div className="container mx-auto p-4 ">
                            <Outlet />
                        </div>
                    </main>
            </div>
        </SidebarProvider>
        </>
    );
};
export default DefaultLayout;
