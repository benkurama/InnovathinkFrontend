import fetchData from "../tools/fetchData"

const getData = async(query, dataName, variables = {}) =>{
    const data = await fetchData(
        query, {
            variables
        }
    );
    
    return data.data[dataName];
}

export default getData;