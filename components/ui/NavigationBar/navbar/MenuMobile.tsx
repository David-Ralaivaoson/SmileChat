import React, { useActionState, useState } from 'react'
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
import { set } from 'better-auth';
import { useTopLoader } from 'nextjs-toploader';

export default function MenuMobile() {
    const { data } = useSession()
    const [ open, setOpen ] = useState<boolean>(false)
    const initialeState = ""
    const [State, formAction, pending] = useActionState(signOutAction, initialeState)

    const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.currentTarget as HTMLElement;

        if (target.tagName === "DIV"){
            setOpen(false)
        }
    }
    console.log('open : ', open)
    
    const user = data?.user


    const loader = useTopLoader()
    
        const handleLogOut = () => {
            formAction()
            loader.start()
        }

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            className="group sm:hidden h-9 w-9 hover:bg-accent hover:text-accent-foreground"
            variant="ghost"
            size="icon"
            >
            <HiMenuAlt2 size={24}/>
            </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-64 p-1"
        onClick={handleOpen}
        >
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
                            formAction={handleLogOut} 
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
