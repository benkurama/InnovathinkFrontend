const graphqlApi = process.env.NEXT_PUBLIC_GRAPHQL;

const setData = async (mutation, data = {}, additionalPath = '') => {

    const headers = {'Content-Type': 'application/json'}

    const res = await fetch(`${graphqlApi}${additionalPath}`, {
    // const res = await fetch("http://localhost:8055/graphql", {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query: mutation,
            variables: data
        })
    })

    const json = await res.json();
    //console.log(res);

    return json;
        
}

export default setData;