import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { setUser, setLoading, setStories } from './features/storySlice.js'
import Navbar from './components/Navbar/Navbar.jsx'

const apiUrl = import.meta.env.VITE_SERVER_API;

function App() {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get(`${apiUrl}/user/get-user`, { 
					withCredentials: true 
				})
				const {user, stories} = res.data.data
				dispatch(setUser(user))
				dispatch(setStories(stories))
			} catch (error) {
			}
			dispatch(setLoading(false))
		}
		if (!user) fetchUser()
	}, [])

	return (
		<>
			<Navbar />
			<Outlet />
		</>
	)
}

export default App