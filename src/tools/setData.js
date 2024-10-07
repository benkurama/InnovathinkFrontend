const graphqlApi = process.env.NEXT_PUBLIC_GRAPHQL
import { signOut } from 'next-auth/react'

const setData = async (mutation, token, data = {}, additionalPath = '') => {

    let headers = null;

    if(token !== ''){
        // console.log('token is not null');
        headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
    } else {
        // console.log('token is null');
        headers = {'Content-Type': 'application/json'}
    }

    const res = await fetch(`${graphqlApi}${additionalPath}`, {
    // const res = await fetch("http://localhost:8055/graphql", {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query: mutation,
            variables: data
        })
    })

    console.log(res.status)
    if(res.status === 401){
        console.log('Unauthorize');
        signOut({ callbackUrl: '/login' })
    }

    const json = await res.json();
    //console.log(res);

    return json;
        
}

export default setData;