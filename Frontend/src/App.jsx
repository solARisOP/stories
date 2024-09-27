import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { setUser, setLoading, setStories } from './features/storySlice.js'
const apiUrl = import.meta.env.VITE_SERVER_API;

function App() {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				let promise = [axios.get(`${apiUrl}/user/get-user`, { withCredentials: true }),
				axios.get(`${apiUrl}/feed/feed-stories`, {withCredentials: true})]
					
				promise = await Promise.all(promise)

				dispatch(setUser(promise[0].data.data.user))

				const storyTypes = [ "food", "health", "travel", "movie", "education", "userStories"]
				promise[1].data.data.forEach((stories, idx) => {
					dispatch(setStories({data:stories, key:storyTypes[idx]})) 
				});

			} catch (error) {
				console.error(error);
			}
			dispatch(setLoading(false))
		}
		if (!user) fetchUser()
	}, [])

	return (
		<Outlet />
	)
}

export default App