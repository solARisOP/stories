import axios from "axios"
const apiUrl = import.meta.env.VITE_SERVER_API

export const loader = async (id) => {
    try {
        const res = await axios.get(`${apiUrl}/feed/bookmarks?limit=4`, {
            withCredentials: true
        })
        return res.data.data
    } catch (error) {
        return []
    }
}