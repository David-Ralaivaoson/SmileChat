import React, { useActionState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../popover'
import { Button } from '../../button'
import { FaHome } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoNotifications, IoSettings } from "react-icons/io5";
import { PiVideoFill } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { NavigationMenu, NavigationMenuList } from '../../navigation-menu'
import Link from 'next/link'
import { Separator } from '../../separator'
import { useSession } from '@/lib/auth-client'
import { signOutAction } from '@/actions/auth.action'
import { HiMenuAlt2 } from "react-icons/hi";
import { useRouter } from 'next/navigation';
import ProfileInPopover from './_components/ProfileInPopover';

export default function MenuMobile() {
    const { data } = useSession()
    const initialeState = ""
    const [State, formAction, pending] = useActionState(signOutAction, initialeState)
    
    const user = data?.user
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button
            className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
            variant="ghost"
            size="icon"
            >
            <HiMenuAlt2 size={24}/>
            </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-64 p-1">
            <NavigationMenu className="max-w-none justify-start px-4 -full">
            <NavigationMenuList className="flex-col items-start justify-start gap-4 w-full py-4">
                <ProfileInPopover />

                <Separator />
                <Link href="/" className='flex items-center gap-4'>
                    <FaHome /> Home 
                </Link>
                <Link href="#" className='flex items-center gap-4'>
                    <AiFillMessage /> Messages
                </Link>
                <Link href="#" className='flex items-center gap-4'>
                    <IoNotifications /> Notifications 
                </Link>
                <Link href="#" className='flex items-center gap-4'>
                    <PiVideoFill /> Vidéo 
                </Link>
                <Separator className='mt-4'/>
                <Link href="#" className='flex items-center gap-4'>
                    <IoSettings /> Paramètre
                </Link>
                <Separator className='mt-4'/>
                {user && (
                    <form>
                        <button className='cursor-pointer flex items-center gap-4'
                            formAction={formAction} 
                        >
                           <TbLogout /> {pending ? "Déconnexion...": "Se déconnecter"}
                        </button>
                    </form>

                )}
            </NavigationMenuList>
            </NavigationMenu>
        </PopoverContent>
    </Popover>
  )
}
