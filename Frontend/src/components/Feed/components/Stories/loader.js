import axios from "axios"
const apiUrl = import.meta.env.VITE_SERVER_API

export const loader = async({params}) => {
    try {
        const {type} = params
    
        if(!['food', 'health', 'travel', 'movie', 'education'].includes(type)) return null
    
        const res = await axios.get(`${apiUrl}/feed/stories?type=${type}`, {
            withCredentials: true
        })
        
        return res.data.data;
    } catch (error) {
        console.log(error.response?.data?.message || error.message);
        return null
    }
}