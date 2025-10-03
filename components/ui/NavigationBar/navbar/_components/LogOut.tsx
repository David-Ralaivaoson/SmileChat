import { signOutAction } from '@/actions/auth.action'
import { useTopLoader } from 'nextjs-toploader'
import React, { useActionState, useState } from 'react'
import { TbLogout } from 'react-icons/tb'

export default function LogOut() {
    const initialeState = ""
    // const loader = useTopLoader()
    const [State, formAction, pending] = useActionState(signOutAction, initialeState)

    // const handleLogOut = () => {
    //     formAction() 

    //     if(pending){
    //         loader.start()
    //     }
    // }
  return (
    <form>
        <button className='cursor-pointer flex items-center gap-4'
            onClick={formAction}
        >
            <TbLogout /> {pending ? "Déconnexion...": "Se déconnecter"}
        </button>
    </form>
  )
}
