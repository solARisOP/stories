import axios from "axios"
const apiUrl = import.meta.env.VITE_SERVER_API

export const loader = async() => {
    try {
        const res = await axios.get(`${apiUrl}/feed/feed-stories`, {
            withCredentials: true
        })
        
        return res.data.data
    } catch (error) {
        console.log(error.response?.data?.message || error.message);
        return null
    }
}