'use client';
import React, { useActionState, useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { PropagateLoader } from 'react-spinners'
import { signUpAction } from '@/actions/auth.action'
import Link from 'next/link'
import { toast } from 'sonner';
import SignInWithGoogleButton from './SignInWithGoogleButton';


export default function SignUpForm() {
  const  initialState = { errorMessage: ""};
  const [state, formAction, pending] = useActionState(signUpAction, initialState)

  useEffect(()=>{
    console.log(state)
    if(state?.errorMessage.length){
      toast(state.errorMessage);
    }
  }, [state])
  return (
    <>
    
    <form action={formAction} className="space-y-4">
            <Input
              type="text"
              name='firstname'
              placeholder="First Name"
              className="w-full"
            />
            <Input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="w-full"
            />
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
                <input type="checkbox" className="mr-2" /> I agree to the Terms & Conditions
              </label>
            </div>
            <Button disabled={pending} aria-disabled={pending} className={`w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200 ${pending ? "cursor-disabled": "cursor-pointer"}`}>
              {pending ? <PropagateLoader size={10} className='flex items-center justify-center'/> : "Créer mon compte"}
            </Button>
      </form>
            <Separator className="my-4" />
            <div className="flex center w-full mt-4 flex-col gap-2">
                <SignInWithGoogleButton />
            </div>
           <p className='text-sm text-black dark:text-white text-center mt-4'>Vous avez déjà un compte ? <Link href={"/auth/login"} className="text-purple-700 font-bold underline">Se connecter</Link></p>
      </>
  )
}
