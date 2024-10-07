"use client"

import UserStore from '@/stores/user'
import {useEffect} from 'react'

export default function SaveDetails({userInfo}){

    const { addToUser, getUser } = UserStore();


    useEffect(() => {

        if(userInfo != ''){
            addToUser(userInfo.user);
            console.log('userInfo set');
        } else {
            console.log('userInfo avoid');
        }

        
    },[])

    

     return(
        <>
        
        {/* <pre>{JSON.stringify(getUser()['items'])}</pre> */}
        {/* <pre>{JSON.stringify(userInfo.user)}</pre> */}
        
        {/* <pre>{JSON.stringify(UserStore.getState().userDetails.items)}</pre> */}
        </>
     )
} 