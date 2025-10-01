'use client';
import React, { useActionState, useEffect } from 'react'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { signInAction } from '@/actions/auth.action'
import { PropagateLoader } from 'react-spinners'
import Link from 'next/link'
import { toast } from 'sonner';
import SignInWithGoogleButton from '../../../components/form/SignInWithGoogleButton';


export default function SignInForm() {
  const  initialState = { errorMessage: ""};
  const [state, formAction, pending] = useActionState(signInAction, initialState)

  useEffect(()=>{
    if(state?.errorMessage.length){
      toast(state.errorMessage);
    }
  }, [state])
  return (
    <>
    <form action={formAction} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full"
            />
            <div className="flex justify-between items-center">
              <label className="inline-flex items-center text-sm text-gray-500 dark:text-gray-300">
                <input type="checkbox" className="mr-2" /> Se souvenir de moi
              </label>
              <label className="text-sm text-purple-700 font-bold underline">
                <Link href={"/auth/forgot-password"}>Mot de passe oublié ?</Link>
              </label>
            </div>
            <Button disabled={pending} aria-disabled={pending} className={`w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200 ${pending ? "cursor-disabled": "cursor-pointer"}`}>
              {pending ? <PropagateLoader size={10} className='flex items-center justify-center'/> : "Connexion"}
            </Button>
      </form>
      <Separator className="my-4" />
      <div className="flex center w-full mt-4 flex-col gap-2">
          <SignInWithGoogleButton />
      </div>
      <p className='text-sm text-black dark:text-white text-center mt-4'>Vous n'avez pas de compte ? <Link href={"/auth/signup"} className="text-purple-700 font-bold underline">S'inscrire</Link></p>
      </>
  )
}
