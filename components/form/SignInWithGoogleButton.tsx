'use client'
import React, { useActionState, useEffect, useTransition } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'
import { signInWithGoogle } from '@/actions/auth.action'
import { PropagateLoader } from 'react-spinners'

export default function SignInWithGoogleButton() {
    
  return (
        <Button onClick={signInWithGoogle} className="w-full bg-transparent border-gray-300 text-black py-2 rounded-md hover:bg-purple-700 transition duration-200 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 cursor-pointer" variant="outline">
            <FcGoogle /> Connect with Google
        </Button>
  )
}
