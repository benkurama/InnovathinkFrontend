"use client"

import Image from 'next/image'
import UserStore from '@/stores/user'

export default function HeaderImageProfile  (){

    const { getUser } = UserStore();

    const imageUrl = process.env.NEXT_PUBLIC_URL +`/assets/` + getUser()['items']?.avatar
    // const imageUrl = `http://127.0.0.1:8055/assets/`+getUser()['items']?.avatar

    return(<>
    
    {/* {JSON.stringify(getUser()['items'].avatar)} */}
    <Image
                fill
                sizes="32px"
                className="rounded-circle"
                // src={session.user.avatar}
                src={imageUrl}
                
              />

    </>)

}