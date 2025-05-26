import { Lock, Home, Pencil, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, useSidebar,
} from '@/components/ui/sidebar.tsx';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/store/reducers/users/users.reducer.ts';
import { FC, RefObject, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';


// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Edit Profile",
    url: "/profile-edit",
    icon: Pencil,
  },
  {
    title: "Logout",
    click: ()=>{},
    icon: Lock,
  },
]
interface PropsI{
  ref:  RefObject<any>;
}

const  SidebarNavigation:FC<PropsI> =({ref})=> {

  const dispatch = useDispatch()
  items[3].click = ()=>{
    dispatch(clearUser())
  }

  const {
    setOpenMobile,
  } = useSidebar()

 const openDrawer=()=>{
    setOpenMobile(true)
 }

  useImperativeHandle(ref,()=>({
    openDrawer
  }))

  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="md:mt-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="py-2">
                  <SidebarMenuButton asChild>
                    {
                      item.url? <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>:
                        <button onClick={item.click}>
                          <item.icon />
                          {item.title}
                        </button>
                    }
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
export default SidebarNavigation;
