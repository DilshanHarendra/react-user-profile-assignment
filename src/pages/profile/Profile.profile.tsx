import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar.tsx';
import { Pencil, ChevronLeft } from 'lucide-react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import BasicInfo from '@/pages/profile/BasicInfo.profile.tsx';
import AdditionalInfo from '@/pages/profile/AdditionalInfo.profile.tsx';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks.ts';
import SpouseInfo from '@/pages/profile/SpouseInfo.profile.tsx';
import PersonalPreference from '@/pages/profile/PersonalPreference.profile.tsx';
const initItems = [
  {
    title: "Basic Details",
    url: "basic",
  },
  {
    title: "Additional Details",
    url: "additional-details",
  },
  {
    title: "Spouse Details",
    url: "spouse-details",
  },
  {
    title: "Personal Preferences",
    url: "personal-preferences",
  },
]
const Profile = () => {

  const [items,setItems] = useState(initItems);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const tab = searchParams.get('tab') || 'basic';
  const isProfile =location.pathname === '/profile';
  const user = useAppSelector((state) => state.user.user);

  const getCard =useCallback(()=>{
    if (tab === 'basic') {
      return <BasicInfo/>;
    }else if(tab === 'additional-details') {
      return <AdditionalInfo/>;
    }else if(tab === 'spouse-details') {
      return <SpouseInfo/>;
    }else if(tab === 'personal-preferences') {
    return <PersonalPreference/>;
  }
    return <></>;

  },[tab])

  useEffect(() => {
    if (user?.status && user.status == 'Married'){
      setItems([...initItems]);
    }else{
      const arr = [...items].filter(item => item.title != 'Spouse Details');
      setItems([...arr])
    }
  },[user])






  return  <>
    <div  className="flex md:justify-end w-full">
      <div className="w-full md:w-3/4">
        <div className="flex items-center justify-between space-x-8">
          <div className="w-full flex  shrink gap-x-2">
            <h2 className="text-2xl font-bold text-nowrap">{isProfile?'My Profile':'Edit Profile'}</h2>
            <span className="border-b-2 border-gray-500 block w-full"></span>
          </div>
          <Link to={isProfile?'/profile-edit':'/profile'} className="flex items-center space-x-2 cursor-pointer mt-3 hover:text-blue-500">
            {
              !isProfile&&<ChevronLeft className="w-5 h-5"/>
            }
            <span className="underline  text-nowrap">{isProfile?'Edit Profile':'Go Back to My Profile'}</span>
            {
              isProfile&&<Pencil className="w-5 h-5"/>
            }
          </Link>
        </div>
      </div>

    </div>

    <div  className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4 md:mt-0s">
      <div>
        <SidebarMenu className="md:mt-5 w-full md:w-fit ">
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="py-2">
              <SidebarMenuButton asChild className={`border-b-2 border-b-gray-300 rounded-none  ${tab == item.url&&'font-bold  border-b-gray-500'}`}>
                <Link to={`?tab=${item.url}`}>
                  <span className="md:text-lg text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
      <div className="col-span-2">
          <div className="flex flex-col md:flex-row md:space-y-0 space-y-4  space-x-6 items-start justify-start bg-white p-5 shadow md:mt-5">
           <div className="border p-2 mx-auto md:mr-6 md:ml-0">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24">
               <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
             </svg>
           </div>
            {getCard()}
          </div>
      </div>

    </div>

  </>
}
export default Profile