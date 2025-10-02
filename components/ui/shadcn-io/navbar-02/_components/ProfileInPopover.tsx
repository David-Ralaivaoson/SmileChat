import { useSession } from '@/lib/auth-client'
import Image from 'next/image'
import { useRouter } from 'nextjs-toploader/app';
import React from 'react'

export default function ProfileInPopover() {
  const router = useRouter()
  const { data } = useSession()
  return (
    <div className='flex items-center gap-4 w-full cursor-pointer' onClick={()=> router.push('/profile')} >
        {data?.user.image ? (
            <Image src={data.user.image} alt={`Profil de ${data.user.name}`} />
            ) : (
            <div className='flex items-center gap-4'>
                <div className='flex items-center justify-center w-8 h-8 min-w-8 min-h-8 rounded-full overflow-hidden bg-red-100'>
                    <h1 className="font-black text-gray-500 text-xl text-center ">{data?.user.name[0]}</h1>
                </div>
                <p className='wrap-anywhere text-gray-500'>{data?.user.name}</p>
            </div>
        )}
    </div>
  )
}
