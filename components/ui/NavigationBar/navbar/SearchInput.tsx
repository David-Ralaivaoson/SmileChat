import React, { useState } from 'react'
import { Input } from '../../input'
import { Button } from '../../button'
import { FaSearch } from "react-icons/fa";
import { cn } from '@/lib/utils';

export default function SearchInput() {
    
  return (
    <div className='hidden sm:flex w-full max-w-sm items-center relative'>
      <Input type="text" placeholder='Recherche...' />
      <Button type='submit' variant='ghost' className={cn('absolute rounded-0 transition-all right-0')}>
        <FaSearch className='text-[#3B82F6]'/>
      </Button>
    </div>
  )
}
