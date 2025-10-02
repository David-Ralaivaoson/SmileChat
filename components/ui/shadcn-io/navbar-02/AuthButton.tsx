'use client'
import React, { useActionState, useEffect, Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem} from "@/components/ui/dropdown-menu"
import { useSession } from '@/lib/auth-client'
import { signOutAction } from '@/actions/auth.action'
import { Skeleton } from '../../skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '../../avatar'
import { useRouter } from 'next/navigation'
import ProfileInPopover from './_components/ProfileInPopover'
import { TbLogout } from 'react-icons/tb'

export default function AuthButton() {
    const router = useRouter()
    const { data } = useSession()
    const initialeState = ""
    const [State, formAction, pending] = useActionState(signOutAction, initialeState)
    
    const user = data?.user
    if(!user || user === undefined){
        return (
        <div>
        <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            onClick={() => {router.push('/auth/login')}}
        >
            Se connecter
        </Button>
        <Button
            size="sm"
            className="text-sm font-medium px-4 h-9 rounded-md shadow-sm text-white bg-gradient-to-r from-[#34D399] via-[#3B82F6] to-[#8B5CF6]"
            onClick={() => {router.push('/auth/signup')}}
        >
            S'incrire
        </Button>
        </div>
        )
    }
  return (
    <Suspense fallback={<Skeleton className='w-[120px] h-10 ' />}>
      <DropdownMenu>
            <DropdownMenuTrigger asChild className='cursor-pointer px-4'>
                <Button variant='outline'>
                    <Avatar className='size-8'>
                        {user?.image ? <AvatarImage src={user.image}/> : null}
                        <AvatarFallback className='bg-orange-200'>{user?.email[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {user?.name.split(' ')[0]}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <ProfileInPopover />
                </DropdownMenuLabel>
                <Separator />
                <DropdownMenuItem>
                    <form>
                        <button className='cursor-pointer flex items-center gap-4'
                            formAction={formAction}
                        >
                           <TbLogout /> {pending ? "Déconnexion...": "Se déconnecter"}
                        </button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </Suspense>

  )
}
