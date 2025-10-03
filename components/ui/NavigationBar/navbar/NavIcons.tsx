'use client'
import Link from 'next/link';
import React from 'react'
import { FaHome } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { PiVideoFill } from "react-icons/pi";
import { useIsMobile } from '@/hooks/useIsMobile';
export default function NavIcons() {

    const {isMobile} = useIsMobile()
  return (
    <div className='flex gap-8 sm:gap-4 w-full'>
        <Link href="/">
            <FaHome size={24} className='text-[#3B82F6] hover:text-[#8B5CF6] transition-all'/>
        </Link>
        <Link href="#">
            <AiFillMessage size={24} className='text-[#3B82F6] hover:text-[#8B5CF6] transition-all' />
        </Link>
        <Link href="#">
            <IoNotifications size={24} className='text-[#3B82F6] hover:text-[#8B5CF6] transition-all'/>
        </Link>
        <Link href="#">
            <PiVideoFill size={24} className='text-[#3B82F6] hover:text-[#8B5CF6] transition-all'/>
        </Link>
    </div>
  )
}
