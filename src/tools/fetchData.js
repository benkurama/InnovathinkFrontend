const graphqlApi = process.env.NEXT_PUBLIC_GRAPHQL;
import { signOut } from 'next-auth/react'

const fetchData = async (query, token, { variables = {} }) => {

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    // console.log("fetchData");
    const res = await fetch(graphqlApi, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables
        })
    })

    console.log(res.status)
    if(res.status === 401){
        console.log('Unauthorize');
        signOut({ callbackUrl: '/login' })
    }

    const json = await res.json();
    //console.log(res);

    if(json.errors){
        throw new Error(json.errors);
    }

    return json;
        
}

export default fetchData;